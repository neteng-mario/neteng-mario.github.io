# ABR 布局规则

## 1. 通用计算方法

### 1.1 公式
```javascript
// 通用 ABR 位置计算
function calculateABRPosition(area1, area2) {
    // area1 和 area2 是包含 {centerX, centerY, width, height} 的区域对象
    const midX = (area1.centerX + area2.centerX) / 2;
    const midY = (area1.centerY + area2.centerY) / 2;
    
    // 调整到重叠区域中心
    const overlapX = Math.max(0, area1.centerX - area2.centerX + (area1.width + area2.width) / 2);
    const overlapY = Math.max(0, area1.centerY - area2.centerY + (area1.height + area2.height) / 2);
    
    return { x: midX, y: midY };
}
```

### 1.2 Area 0 与 Area 1 示例
```javascript
// Area 0 与 Area 1 边界 ABR 位置
const cx = w / 2, cy = h / 2;
devices[2].x = cx - 300; devices[2].y = cy - 120;
```

## 2. 视觉平衡原则

### 2.1 相交面积
- ABR 与每个区域的相交面积应视觉上对称
- 水平位置：位于两个区域边界的中点
- 垂直位置：位于两个区域垂直重叠区域中心

### 2.2 视觉中心
- ABR 应位于两个区域的视觉中心位置
- 与每个区域的距离应大致相等
- 确保同时与两个区域相交

## 3. 通用调整步骤

### 3.1 初始位置
1. 计算两个区域的中心坐标
2. 找到两个区域边界的中点
3. 调整垂直位置到重叠区域中心

### 3.2 微调
1. 水平微调增加与目标区域的相交面积
2. 垂直微调保持视觉平衡
3. 确保同时与两个区域相交

## 4. 应用场景

### 4.1 多区域布局
- 适用于所有区域边界的 ABR 位置计算
- 保持所有 ABR 布局风格一致
- 确保视觉平衡和美观性

### 4.2 动态布局
- 可扩展为动态计算方法
- 支持区域位置变化时自动调整 ABR 位置