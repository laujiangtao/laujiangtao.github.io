---
title: 线性伸缩圆角矩形indicator
pathsuffix: linear-telescopic-fillet-rectangle-indicator
comments: false
date: 2021-03-27 20:27:00
tags: 自定义View
category: 技术
---

UI给了一个轮播图的交互
![UI](UI.png)

网上找了一圈，没有很合适的轮子，趁周末自己写了一下

UI显示是ViewPager + Indicator，那么，Indicator和ViewPager的联动，就用比较流行的[MagicIndicator](https://github.com/hackware1993/MagicIndicator)去处理，主要关心的是怎样自己定义一个符合UI设计的Indicator

需求是，当向左滑动ViewPager的时候，当前逐渐Indicator变小，下一个逐渐Indicator变大，切换完成之后效果类似两个Indicator交换位置。

效果如下
![最终效果](./scale-linear-rounded-rectangle-navigator.gif)

<details>
<summary><font color='blue'>点我展开代码</font></summary>

```java
import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.PointF;
import android.graphics.RectF;
import android.os.Build;
import android.util.SparseArray;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewConfiguration;
import android.view.animation.Interpolator;
import android.view.animation.LinearInterpolator;

import net.lucode.hackware.magicindicator.NavigatorHelper;
import net.lucode.hackware.magicindicator.abs.IPagerNavigator;

import java.util.ArrayList;
import java.util.List;

/**
 * 线性伸缩圆角矩形indicator
 * Created by laujiangtao on 2021/3/27.
 */

public class ScaleLinearRoundedRectangleNavigator extends View implements IPagerNavigator, NavigatorHelper.OnNavigatorScrollListener {
    private int mRadius;//小圆点半径
    private int mNormalCircleColor = Color.LTGRAY;
    private int mSelectedCircleColor = Color.GRAY;
    private int mCircleSpacing;//圆点之间的空隙
    private int mCircleCount;//indicator个数
    private int mRectWidth;//圆角矩形宽，看作横向伸缩的圆

    private Paint mPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
    //存放各个圆心位置
    private List<PointF> mCirclePoints = new ArrayList<PointF>();
    //稀疏数组存放各个圆的半径
    private SparseArray<Float> mCircleRadiusArray = new SparseArray<Float>();

    // 事件回调
    private boolean mTouchable;
    private ScaleLinearRoundedRectangleNavigator.OnCircleClickListener mCircleClickListener;
    private float mDownX;
    private float mDownY;
    private int mTouchSlop;

    // 是否跟随手指滑动
    private boolean mFollowTouch = true;
    private NavigatorHelper mNavigatorHelper = new NavigatorHelper();
    //使用线性插补器
    private Interpolator mStartInterpolator = new LinearInterpolator();

    public ScaleLinearRoundedRectangleNavigator(Context context) {
        super(context);
        init(context);
    }

    private void init(Context context) {
        mTouchSlop = ViewConfiguration.get(context).getScaledTouchSlop();
        mRadius = UIUtil.dip2px(context, 3);
        mCircleSpacing = UIUtil.dip2px(context, 18);
        mRectWidth = UIUtil.dip2px(context, 30);
        mNavigatorHelper.setNavigatorScrollListener(this);
        mNavigatorHelper.setSkimOver(true);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        setMeasuredDimension(measureWidth(widthMeasureSpec), measureHeight(heightMeasureSpec));
    }

    private int measureWidth(int widthMeasureSpec) {
        int mode = MeasureSpec.getMode(widthMeasureSpec);
        int width = MeasureSpec.getSize(widthMeasureSpec);
        int result = 0;
        switch (mode) {
            case MeasureSpec.EXACTLY:
                result = width;
                break;
            case MeasureSpec.AT_MOST:
            case MeasureSpec.UNSPECIFIED:
                if (mCircleCount <= 0) {
                    result = getPaddingLeft() + getPaddingRight();
                } else {
                    //一个圆角矩形的横向宽 + (n-1)*小圆直径 + (n-1)*圆之间的空隙 + 左右边距
                    result = mRectWidth + (mCircleCount - 1) * mRadius * 2 + (mCircleCount - 1) * mCircleSpacing + getPaddingLeft() + getPaddingRight();
                }
                break;
            default:
                break;
        }
        return result;
    }

    private int measureHeight(int heightMeasureSpec) {
        int mode = MeasureSpec.getMode(heightMeasureSpec);
        int height = MeasureSpec.getSize(heightMeasureSpec);
        int result = 0;
        switch (mode) {
            case MeasureSpec.EXACTLY:
                result = height;
                break;
            case MeasureSpec.AT_MOST:
            case MeasureSpec.UNSPECIFIED:
                //小圆的直径 + 上下边距
                result = mRadius * 2 + getPaddingTop() + getPaddingBottom();
                break;
            default:
                break;
        }
        return result;
    }

    @Override
    protected void onDraw(Canvas canvas) {
        //遍历画每个位置上的View
        for (int i = 0, j = mCirclePoints.size(); i < j; i++) {
            //获取圆心位置
            PointF point = mCirclePoints.get(i);
            //从稀疏数组中获取当前位置圆的半径
            float radius = mCircleRadiusArray.get(i, (float) mRadius);
            //颜色渐变处理
            mPaint.setColor(eval((radius - mRadius) / (mRectWidth / 2 - mRadius), mNormalCircleColor, mSelectedCircleColor));
            @SuppressLint("DrawAllocation")
            RectF rectF = new RectF();
            if (radius == (float) mRadius || Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP) {
                //如果是小圆或者当前SDK小于Android5，直接画小圆
                rectF.left = point.x - mRadius;
                rectF.right = point.x + mRadius;
            } else {
                //宽度渐变，算法同颜色渐变
                //权重：当前变化量与最大变化量之比 => (radius - mRadius) / (mRectWidth / 2 - mRadius)
                //当前变化位置 => 权重 * 横向变化量 => 权重 *（结束宽度 - 开始宽度）=> weight * (end - start)
                //从小圆变为圆角矩形，那么半径从 mRadius 变为（mRectWidth / 2），即开始半径为 mRadius，结束时半径为（mRectWidth / 2）
                //左边变化之后位置为 最大变化位置 - mRadius
                //右边变化之后位置为 最大变化位置 + mRadius
                int ff = -mRadius + (int) ((radius - mRadius) / (mRectWidth / 2 - mRadius) * (mRadius - mRectWidth / 2));
                rectF.left = point.x - ff;
                rectF.right = point.x + ff;
            }
            rectF.top = point.y - mRadius;
            rectF.bottom = point.y + mRadius;
            canvas.drawRoundRect(rectF, radius, radius, mPaint);
        }
    }

    private void prepareCirclePoints() {
        mCirclePoints.clear();
        if (mCircleCount > 0) {
            int y = Math.round(getHeight() / 2.0f);
            //圆心间距 => 一个小圆 + 圆的间隙
            int centerSpacing = mRadius * 2 + mCircleSpacing;
            //开始是圆心位置 => 左间距 + 圆角矩形宽的一半
            int startX = getPaddingLeft() + mRectWidth / 2;
            for (int i = 0; i < mCircleCount; i++) {
                PointF pointF = new PointF(startX, y);
                mCirclePoints.add(pointF);
                startX += centerSpacing;
            }
        }
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        float x = event.getX();
        float y = event.getY();
        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:
                if (mTouchable) {
                    mDownX = x;
                    mDownY = y;
                    return true;
                }
                break;
            case MotionEvent.ACTION_UP:
                if (mCircleClickListener != null) {
                    if (Math.abs(x - mDownX) <= mTouchSlop && Math.abs(y - mDownY) <= mTouchSlop) {
                        float max = Float.MAX_VALUE;
                        int index = 0;
                        for (int i = 0; i < mCirclePoints.size(); i++) {
                            PointF pointF = mCirclePoints.get(i);
                            float offset = Math.abs(pointF.x - x);
                            if (offset < max) {
                                max = offset;
                                index = i;
                            }
                        }
                        mCircleClickListener.onClick(index);
                    }
                }
                break;
            default:
                break;
        }
        return super.onTouchEvent(event);
    }

    @Override
    public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
        mNavigatorHelper.onPageScrolled(position, positionOffset, positionOffsetPixels);
    }

    @Override
    public void onPageSelected(int position) {
        mNavigatorHelper.onPageSelected(position);
    }

    @Override
    public void onPageScrollStateChanged(int state) {
        mNavigatorHelper.onPageScrollStateChanged(state);
    }

    @Override
    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
        prepareCirclePoints();
    }

    @Override
    public void notifyDataSetChanged() {
        prepareCirclePoints();
        requestLayout();
    }

    @Override
    public void onAttachToMagicIndicator() {
    }

    @Override
    public void onDetachFromMagicIndicator() {
    }

    public void setMinRadius(int minRadius) {
        mRadius = minRadius;
        prepareCirclePoints();
        invalidate();
    }

    public void setNormalCircleColor(int normalCircleColor) {
        mNormalCircleColor = normalCircleColor;
        invalidate();
    }

    public void setSelectedCircleColor(int selectedCircleColor) {
        mSelectedCircleColor = selectedCircleColor;
        invalidate();
    }

    public void setCircleSpacing(int circleSpacing) {
        mCircleSpacing = circleSpacing;
        prepareCirclePoints();
        invalidate();
    }

    public void setRectWidth(int rectWidth) {
        this.mRectWidth = rectWidth;
        prepareCirclePoints();
        invalidate();
    }

    public void setStartInterpolator(Interpolator startInterpolator) {
        mStartInterpolator = startInterpolator;
        if (mStartInterpolator == null) {
            mStartInterpolator = new LinearInterpolator();
        }
    }

    public void setCircleCount(int count) {
        mCircleCount = count;  // 此处不调用invalidate，让外部调用notifyDataSetChanged
        mNavigatorHelper.setTotalCount(mCircleCount);
    }

    public void setTouchable(boolean touchable) {
        mTouchable = touchable;
    }

    public void setFollowTouch(boolean followTouch) {
        mFollowTouch = followTouch;
    }

    public void setSkimOver(boolean skimOver) {
        mNavigatorHelper.setSkimOver(skimOver);
    }

    public void setCircleClickListener(OnCircleClickListener circleClickListener) {
        if (!mTouchable) {
            mTouchable = true;
        }
        mCircleClickListener = circleClickListener;
    }

    @Override
    public void onEnter(int index, int totalCount, float enterPercent, boolean leftToRight) {
        if (mFollowTouch) {
            //进入时，半径从小变大，mRadius => mRectWidth / 2
            //mStartInterpolator.getInterpolation(enterPercent) 即为权重
            float radius = mRadius + (mRectWidth / 2 - mRadius) * mStartInterpolator.getInterpolation(enterPercent);
            mCircleRadiusArray.put(index, radius);
            invalidate();
        }
    }

    @Override
    public void onLeave(int index, int totalCount, float leavePercent, boolean leftToRight) {
        if (mFollowTouch) {
            //离开时，半径从大变小，mRectWidth / 2 => mRadius
            float radius = mRectWidth / 2 - (mRectWidth / 2 - mRadius) * mStartInterpolator.getInterpolation(leavePercent);
            mCircleRadiusArray.put(index, radius);
            invalidate();
        }
    }

    @Override
    public void onSelected(int index, int totalCount) {
        if (!mFollowTouch) {
            mCircleRadiusArray.put(index, (float) mRectWidth / 2);
            invalidate();
        }
    }

    @Override
    public void onDeselected(int index, int totalCount) {
        if (!mFollowTouch) {
            mCircleRadiusArray.put(index, (float) mRadius);
            invalidate();
        }
    }

    public interface OnCircleClickListener {
        void onClick(int index);
    }

    private int eval(float fraction, int startValue, int endValue) {
        int startA = (startValue >> 24) & 0xff;
        int startR = (startValue >> 16) & 0xff;
        int startG = (startValue >> 8) & 0xff;
        int startB = startValue & 0xff;

        int endA = (endValue >> 24) & 0xff;
        int endR = (endValue >> 16) & 0xff;
        int endG = (endValue >> 8) & 0xff;
        int endB = endValue & 0xff;

        int currentA = (startA + (int) (fraction * (endA - startA))) << 24;
        int currentR = (startR + (int) (fraction * (endR - startR))) << 16;
        int currentG = (startG + (int) (fraction * (endG - startG))) << 8;
        int currentB = startB + (int) (fraction * (endB - startB));

        return currentA | currentR | currentG | currentB;
    }

    public int dip2px(Context context, double dpValue) {
        float density = context.getResources().getDisplayMetrics().density;
        return (int) (dpValue * density + 0.5);
    }
}
```

</details>