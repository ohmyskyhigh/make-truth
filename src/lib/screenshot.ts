import { toPng } from 'html-to-image';

// 获取模板文件内容
async function getTemplateContent(): Promise<string> {
  const response = await fetch('/truth-template.html');
  return response.text();
}

/**
 * 等待元素内的所有图片加载完成
 * @param element 要等待图片加载的元素
 * @returns Promise<void>
 */
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

/**
 * 将元素下载为PNG图片
 * @param content 要生成截图的内容
 * @param filename 下载文件名
 */
export async function downloadElementAsImage(content: string, filename: string = 'truth-screenshot', size: { width: number; height: number; } = { width: 600, height: 400 }): Promise<void> {
  try {
    // 获取模板内容
    const template = await getTemplateContent();
    
    // 替换模板中的占位符
    const htmlContent = template
      .replace('{{avatar}}', '/DonnyT.jpeg')
      .replace('{{username}}', 'Donald J. Trump')
      .replace('{{handle}}', '@realDonaldTrump')
      .replace('{{content}}', content.replace(/\n/g, '<br>'))
      .replace('{{retruths}}', '15.4k ReTruths')
      .replace('{{likes}}', '47.2k Likes')
      .replace('{{timestamp}}', 'Jun 12, 2023, 11:40 AM');
    
    // 创建临时DOM元素
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlContent;
    tempElement.style.position = 'absolute';
    tempElement.style.left = '-9999px';
    tempElement.style.top = '-9999px';
    
    // 获取.background元素并设置尺寸
    const backgroundElement = tempElement.querySelector('.background');
    if (backgroundElement instanceof HTMLElement) {
      backgroundElement.style.width = `${size.width}px`;
      backgroundElement.style.height = `${size.height}px`;
    }
    
    // 先将元素添加到DOM中，确保其正确渲染
    document.body.appendChild(tempElement);
    
    // 强制重排，确保元素已渲染
    tempElement.offsetHeight;
    
    // 等待图片加载完成
    await waitForImages(tempElement);
    
    // 使用html-to-image将元素转换为PNG
    const dataUrl = await toPng(tempElement, { cacheBust: true });
    
    // 移除临时元素
    document.body.removeChild(tempElement);
    
    // 创建下载链接并下载图片
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Screenshot generation failed:', error);
    throw new Error('截图生成失败，请重试');
  }
}

/**
 * 使用ref将元素下载为PNG图片
 * @param node 包含要截图内容的DOM节点
 * @param filename 下载文件名
 */
export async function downloadElementAsImageFromRef(node: HTMLElement, filename: string = 'truth-screenshot'): Promise<void> {
  try {
    // 等待图片加载完成
    await waitForImages(node);
    
    // 使用html-to-image将元素转换为PNG
    const dataUrl = await toPng(node, { cacheBust: true });
    
    // 创建下载链接并下载图片
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Screenshot generation failed:', error);
    throw new Error('截图生成失败，请重试');
  }
}