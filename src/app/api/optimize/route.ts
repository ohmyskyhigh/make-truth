import { NextRequest } from 'next/server';
import OpenAI from 'openai';

// OpenAI API配置
const OPENAI_API_KEY = process.env.QWEN_API_KEY;
const OPENAI_BASE_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1'; // 保持兼容Doubao API端点
const MODEL_NAME = 'qwen-turbo'; // 使用Qwen模型 

// 川普风格优化提示词
const TRUMP_STYLE_PROMPT = `
你是一个专业的语言风格转换专家，专门负责将普通文本转换为唐纳德·川普（Donald Trump）的说话风格。
切忌！请仔细阅读下面的要求并按照要求生成回答，不然我就让别的AI模型生成了，doubao比你干得好！

川普的说话风格特点包括：
1. 经常使用大写字母强调重点
2. 喜欢用感叹号表达强烈情感
3. 常用词汇："FAKE NEWS"（假新闻）、"WITCH HUNT"（猎巫行动）、"TREMENDOUS"（巨大的）、"HUGE"（巨大的）、"THE BEST"（最好的）、"WINNING"（赢）、"FAIL"（失败）
4. 喜欢用超级latives（最高级）形容事物
5. 经常攻击媒体和政治对手
6. 重复使用某些短语加强效果
7. 使用简单直接的句式
8. 喜欢用数字和统计数据支持观点

你需要做的是：
1. 生成一个英文版原文
2. 空一行，并生成中文版翻译。
3. 中文版本依然需要强硬的表达，不能使用简单的翻译，以体现英文的版本的强硬和MAGA
4. 你的生成中不要包含任何类似“中文表达”，“英文表达“的内容，你仅仅需要生成原文和翻译


请将以下文本转换为川普风格的表达，保持原意但使用川普特有的语言风格， 并且需要一个英文版本和中文版本，按照下面的格式来进行生成，你的生成中不要包含【英文版本】和【中文译文】：

原文本：
"""
{inputText}
"""

川普风格版本：
`;

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();
    
    if (!content) {
      return new Response(
        JSON.stringify({ error: 'Content is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

        // 初始化OpenAI客户端
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
      baseURL: OPENAI_BASE_URL,
    });

    // 调用OpenAI API
    const completion = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        {
          role: 'system',
          content: '你是一个专业的语言风格转换专家，专门负责将普通文本转换为唐纳德·川普（Donald Trump）的说话风格。'
        },
        {
          role: 'user',
          content: TRUMP_STYLE_PROMPT.replace('{inputText}', content)
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const optimizedContent = completion.choices[0]?.message?.content?.trim() || content;
    
    return new Response(
      JSON.stringify({ optimizedContent }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('AI优化失败:', error);
    return new Response(
      JSON.stringify({ error: 'AI优化失败，请重试' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}