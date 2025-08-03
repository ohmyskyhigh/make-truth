# MakeTruth 产品设计文档

## 产品概述

### 产品名称
[Make Truth](https://www.maketruth.art/)

### 产品简介
MakeTruth是一款创新的社交媒体内容生成工具，专门用于生成川普风格的Truth Social截图。用户可以自定义帖子内容，并通过AI优化功能让内容更贴近川普的独特表达风格。

### 产品愿景
为用户提供一个有趣、易用的平台，让他们能够创造出逼真的川普风格社交媒体内容，用于娱乐、模仿或创意表达。

### 依赖管理
本项目使用pnpm作为包管理工具来管理所有依赖项，以确保依赖的一致性和安装速度。

## 问题分析

### 核心问题
1. **内容创作难度**：普通用户难以模仿川普独特的表达风格和语言习惯
2. **技术门槛**：制作逼真的社交媒体截图需要专业的设计技能
3. **时间成本**：手动创建和编辑截图耗时较长
4. **一致性问题**：难以保持与Truth Social平台的视觉一致性

### 目标用户
- 社交媒体内容创作者
- 娱乐和模仿内容制作者
- 政治讽刺和幽默内容创作者
- 普通用户（用于娱乐目的）

## 产品解决方案

### 核心价值主张
1. **智能内容优化**：AI驱动的川普风格语言转换
2. **一键生成**：快速生成高质量的Truth Social风格截图
3. **用户友好**：简洁直观的界面设计
4. **高度还原**：精确模拟Truth Social的视觉风格

### 技术架构
- **前端**：Next.js + TypeScript + Tailwind CSS + shadcn/ui组件库
- **AI模块**：OpenAI SDK集成，通过API路由实现川普风格语言转换，避免前端暴露API密钥
- **图像生成**：HTML转图片方案，将Truth Social帖子以HTML形式渲染后转换为图片
- **响应式设计**：支持多设备访问

## 产品功能规格

### 核心功能

#### 1. 自定义内容编辑
- **功能描述**：用户可以输入和编辑自定义的帖子内容
- **技术实现**：文本输入框，支持实时预览
- **用户体验**：字符计数、格式提示

#### 2. AI内容优化
- **功能描述**：AI分析用户输入，转换为川普风格的表达
- **技术实现**：调用AI API，进行语言风格转换
- **优化维度**：
  - 语言风格（大写字母使用、感叹号等）
  - 词汇选择（川普常用词汇）
  - 句式结构（简短有力的表达）

#### 3. 实时预览
- **功能描述**：实时显示Truth Social风格的截图预览
- **技术实现**：动态渲染组件，模拟Truth Social界面
- **视觉元素**：
  - 川普头像和用户名
  - Truth Social界面样式
  - 时间戳和互动数据

#### 4. 截图生成
- **功能描述**：生成高质量的Truth Social风格截图
- **技术实现**：HTML渲染Truth Social帖子样式，然后转换为图片
- **输出格式**：PNG/JPEG，支持不同分辨率

### 辅助功能

#### 1. 模板系统
- 预设常用的川普风格模板
- 快速应用和自定义修改

#### 2. 历史记录
- 保存用户创建的内容历史
- 支持重新编辑和生成

#### 3. 分享功能
- 支持直接下载截图
- 社交媒体分享集成

## UI布局设计

### 整体布局
- **Header**：页面顶部，包含产品Logo "MakeTruth"
- **Body**：水平双卡片布局，移动端自动切换为垂直布局
- **左侧卡片**：内容编辑区域，包含文本输入框和AI优化按钮
- **右侧卡片**：Truth Social风格预览区域
- **底部**：截图生成按钮，居中对齐

### 色彩方案
- **主色调**：大红色（MAGA红）#DC2626
- **背景色**：白色和浅灰色
- **文字色**：深色系
- **按钮**：红色主题，体现川普MAGA风格

## 用户体验流程

### 主要用户路径
1. **进入应用** → 查看简洁的界面布局
2. **输入内容** → 在左侧卡片中编写自定义内容
3. **AI优化**（可选）→ 点击AI优化按钮改善内容风格
4. **实时预览** → 在右侧卡片中查看Truth截图效果
5. **生成截图** → 点击生成按钮创建最终截图
6. **下载分享** → 保存或分享生成的截图

### 交互细节
- **实时反馈**：输入内容时实时更新预览
- **加载状态**：AI处理和截图生成时显示加载动画
- **错误处理**：友好的错误提示和恢复建议
- **响应式交互**：适配不同设备的触摸和点击操作

## 技术实现要点

### 前端技术栈
- **框架**：Next.js 15+ (App Router)
- **语言**：TypeScript
- **样式**：Tailwind CSS + shadcn/ui组件库
- **状态管理**：React Hooks + Context API
- **图像处理**：HTML转图片（html2canvas或类似库）

### AI集成
- **SDK**：Doubao SDK
- **模型**：Doubao-Seed-1.6-flash
- **提示工程**：精心设计的川普风格转换提示
- **错误处理**：API调用失败的降级方案
- **安全实现**：通过API路由实现，避免前端暴露API密钥

### 图像生成方案
- **HTML渲染**：使用React组件渲染Truth Social帖子样式
- **转换工具**：html2canvas等库将HTML元素转换为图片
- **样式控制**：确保生成的HTML完全模拟Truth Social界面
- **性能优化**：图像压缩和格式优化

### Truth Social截图生成技术解决方案

#### 相关文件
- `src/lib/screenshot.ts`: 核心截图生成逻辑
- `public/truth-template.html`: Truth Social卡片的HTML模板
- `src/app/page.tsx`: 调用截图生成功能的UI组件

#### 解决所需的依赖
- `html2canvas-pro`: 用于将HTML元素转换为图片的库，支持现代CSS颜色函数（如lab）

#### 整体流程
1. 用户在UI中输入内容并点击生成截图按钮
2. 调用`downloadElementAsImage`函数，传入用户输入的内容
3. 读取`public/truth-template.html`模板文件
4. 将模板中的占位符替换为实际内容
5. 创建临时DOM元素并添加到页面中
6. 等待所有图片加载完成
7. 使用`html2canvas-pro`将临时DOM元素转换为canvas
8. 将canvas转换为PNG图片并下载

#### 尺寸自适应和居中显示
为了确保截图背景尺寸固定并使截图卡片居中，我们在`page.tsx`中实现了以下功能：
1. 创建一个固定尺寸的临时容器（600x400像素）
2. 使用flex布局将内容居中显示
3. 克隆预览内容并添加到临时容器中
4. 调用`downloadElementAsImageFromRef`函数生成截图

#### 相关函数
```typescript:/Users/runkunmiao/FunStuff/make-truth/src/lib/screenshot.ts
// 获取模板文件内容
async function getTemplateContent(): Promise<string> {
  const response = await fetch('/truth-template.html');
  return response.text();
}

// 等待元素内的所有图片加载完成
export function waitForImages(element: HTMLElement): Promise<void> {
  return new Promise((resolve, reject) => {
    const images = element.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = images.length;
    
    // 如果没有图片，直接resolve
    if (totalImages === 0) {
      resolve();
      return;
    }
    
    // 设置10秒超时
    const timeout = setTimeout(() => {
      console.warn('Image loading timeout, proceeding with screenshot');
      resolve();
    }, 10000);
    
    const checkAllImagesLoaded = () => {
      if (loadedCount === totalImages) {
        clearTimeout(timeout);
        resolve();
      }
    };
    
    images.forEach(img => {
      if (img.complete && img.naturalHeight !== 0) {
        // 图片已经加载完成
        loadedCount++;
        checkAllImagesLoaded();
      } else {
        // 图片尚未加载完成，设置监听器
        img.onload = () => {
          loadedCount++;
          checkAllImagesLoaded();
        };
        
        img.onerror = () => {
          console.warn(`Failed to load image: ${img.src}`);
          loadedCount++;
          checkAllImagesLoaded();
        };
      }
    });
    
    // 检查初始状态
    checkAllImagesLoaded();
  });
}
export function waitForImages(element: HTMLElement): Promise<void> {
  return new Promise((resolve, reject) => {
    const images = element.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = images.length;
    
    // 如果没有图片，直接resolve
    if (totalImages === 0) {
      resolve();
      return;
    }
    
    // 设置10秒超时
    const timeout = setTimeout(() => {
      console.warn('Image loading timeout, proceeding with screenshot');
      resolve();
    }, 10000);
    
    const checkAllImagesLoaded = () => {
      if (loadedCount === totalImages) {
        clearTimeout(timeout);
        resolve();
      }
    };
    
    images.forEach(img => {
      if (img.complete && img.naturalHeight !== 0) {
        // 图片已经加载完成
        loadedCount++;
        checkAllImagesLoaded();
      } else {
        // 图片尚未加载完成，设置监听器
        img.onload = () => {
          loadedCount++;
          checkAllImagesLoaded();
        };
        
        img.onerror = () => {
          console.warn(`Failed to load image: ${img.src}`);
          loadedCount++;
          checkAllImagesLoaded();
        };
      }
    });
    
    // 检查初始状态
    checkAllImagesLoaded();
  });
}

// 等待元素内的所有图片加载完成
export function waitForImages(element: HTMLElement): Promise<void>

// 将元素下载为PNG图片
export async function downloadElementAsImage(content: string, filename: string = 'truth-screenshot'): Promise<void> {
  try {
    // 获取模板内容
    const template = await getTemplateContent();
    
    // 替换模板中的占位符
    const htmlContent = template
      .replace('{{avatar}}', '/DonnyT.jpeg')
      .replace('{{username}}', 'Donald J. Trump')
      .replace('{{handle}}', '@realDonaldTrump')
      .replace('{{content}}', content)
      .replace('{{retruths}}', '15.4k ReTruths')
      .replace('{{likes}}', '47.2k Likes')
      .replace('{{timestamp}}', 'Jun 12, 2023, 11:40 AM');
    
    // 创建临时DOM元素
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlContent;
    tempElement.style.position = 'absolute';
    tempElement.style.left = '-9999px';
    tempElement.style.top = '-9999px';
    document.body.appendChild(tempElement);
    
    // 等待图片加载完成
    await waitForImages(tempElement);
    
    // 使用html2canvas将元素转换为canvas
    const canvas = await html2canvas(tempElement, {
      useCORS: true,
      scale: 2, // 提高截图质量
      foreignObjectRendering: false
    });
    
    // 移除临时元素
    document.body.removeChild(tempElement);
    
    // 将canvas转换为blob并下载
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${filename}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          resolve();
        } else {
          reject(new Error('Canvas to blob conversion failed'));
        }
      });
    });
  } catch (error) {
    console.error('Screenshot generation failed:', error);
    throw new Error('截图生成失败，请重试');
  }
}
```

## 开发重点

### 核心功能实现
1. **shadcn/ui组件集成**：使用现代化的UI组件库快速构建界面
2. **Doubao SDK集成**：通过API路由实现川普风格的AI内容优化
3. **HTML转图片**：精确还原Truth Social界面并转换为高质量图片
4. **响应式设计**：确保在各种设备上的良好体验

### 技术要点
- 使用红色主题体现MAGA风格
- 确保AI生成内容的准确性和风格一致性
- 优化HTML到图片的转换质量和速度
- 实现流畅的用户交互体验

---

*本文档将根据开发进度和用户反馈持续更新*