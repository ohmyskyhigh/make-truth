"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
  
import { Textarea } from "@/components/ui/textarea";
import { downloadElementAsImage, downloadElementAsImageFromRef, waitForImages } from "@/lib/screenshot";

export default function Home() {
  const [content, setContent] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleOptimize = async () => {
    setIsOptimizing(true);
    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error('优化失败');
      }

      const data = await response.json();
      setContent(data.optimizedContent);
    } catch (error) {
      console.error('AI优化失败:', error);
      alert('AI优化失败，请重试');
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleGenerate = async () => {
    if (!content.trim()) {
      return;
    }

    setIsGenerating(true);
    try {
      // 使用ref生成截图
      if (previewRef.current) {
        await downloadElementAsImageFromRef(
          previewRef.current,
          `truth-social-${Date.now()}`
        );
      }
    } catch (error) {
      console.error('Screenshot generation failed:', error);
      alert('截图生成失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <img src="/logo.png" alt="MakeTruth Logo" className="h-20 w-auto" />
          <div>
            <h1 className="text-3xl font-bold text-red-600">MakeTruth</h1>
            <p className="text-gray-600 mt-1">生成川普风格的Truth Social截图</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧卡片 - 内容编辑区域 */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                内容编辑
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  输入你想要的内容
                </label>
                <Textarea
                  id="content"
                  placeholder="在这里输入你想要川普说的话..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
                <div className="text-sm text-gray-500 mt-2">
                  字符数: {content.length}
                </div>
              </div>
              
              <Button
                onClick={handleOptimize}
                disabled={!content.trim() || isOptimizing}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                {isOptimizing ? "AI优化中..." : "🤖 AI优化为川普风格"}
              </Button>
            </CardContent>
          </Card>

          {/* 右侧卡片 - Truth Social预览区域 */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Truth Social预览
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                ref={previewRef}
                data-preview="true"
                className="bg-white rounded-2xl p-6 min-h-[400px] shadow-sm border border-gray-100 flex items-center justify-center w-full"
              >
                {content ? (
                  <div 
                  className="truth-card bg-white rounded-2xl p-4 shadow-md w-[600px] max-w-[600px] font-sans"
                  >
                    {/* 用户信息 */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      <img 
                        src="/DonnyT.jpeg" 
                        alt="Donald Trump"
                        className="w-12 h-12 rounded-full object-cover" 
                      />
                      <div style={{ flex: 1 }}>
                        <div 
                        className="flex gap-1 items-center"
                        >
                          <span 
                          className="text-sm font-bold text-gray-900"
                          >
                            Donald J. Trump
                          </span>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '14px',
                            width: '14px'
                          }}>
                          <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 text-secondary-500" data-testid="svg-icon" style={{
                            width: '20px',
                            height: '20px'
                          }}>
                            <title>Verified Account</title>
                            <path d="M8.82.521a1.596 1.596 0 012.36 0l.362.398c.42.46 1.07.635 1.664.445l.512-.163a1.596 1.596 0 012.043 1.18l.115.525a1.596 1.596 0 001.218 1.218l.525.115a1.596 1.596 0 011.18 2.043l-.163.513a1.596 1.596 0 00.446 1.663l.397.362a1.596 1.596 0 010 2.36l-.397.362c-.461.42-.635 1.07-.446 1.664l.163.512a1.596 1.596 0 01-1.18 2.043l-.525.115a1.596 1.596 0 00-1.218 1.218l-.115.525a1.596 1.596 0 01-2.043 1.18l-.512-.163a1.596 1.596 0 00-1.664.445l-.362.398a1.596 1.596 0 01-2.36 0l-.362-.398a1.596 1.596 0 00-1.663-.445l-.513.163a1.596 1.596 0 01-2.043-1.18l-.115-.525a1.596 1.596 0 00-1.218-1.218l-.525-.115a1.596 1.596 0 01-1.18-2.043l.164-.512a1.596 1.596 0 00-.446-1.664L.52 11.18a1.596 1.596 0 010-2.36l.398-.362c.46-.42.635-1.07.446-1.663L1.2 6.282a1.596 1.596 0 011.18-2.043l.525-.115a1.596 1.596 0 001.218-1.218l.115-.525A1.596 1.596 0 016.282 1.2l.513.163c.594.19 1.244.015 1.663-.445L8.821.52z" fill="rgb(255 71 117/1)"></path><path d="M6.66 7.464L5.012 9.111l3.85 3.85 5.483-5.481-1.966-1.966L8.544 9.35 6.66 7.464z" fill="#fff"></path><path opacity=".5" d="M11.25 15.55l-1.646-1.848 1.646-1.646 1.887 1.887-1.887 1.606z" fill="#fff">
                              </path>
                              </svg>
                          </div>
                        </div>
                        <div style={{
                          fontSize: '15px',
                          color: '#6B7280'
                        }}>
                          @realDonaldTrump
                        </div>
                      </div>
                    </div>
                    
                    {/* 帖子内容 */}
                    <div style={{
                      fontSize: '15px',
                      lineHeight: '20px',
                      fontWeight: 'normal',
                      color: '#111827',
                      margin: '16px 0',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {content}
                    </div>
                    
                    {/* 互动数据 */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '13px',
                      paddingTop: '12px',
                      color: '#6B7280'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '24px'
                      }}>
                        <span style={{ fontWeight: '500' }}>15.4k ReTruths</span>
                        <span style={{ fontWeight: '500' }}>47.2k Likes</span>
                      </div>
                      <span style={{ color: '#9CA3AF' }}>Jun 12, 2023, 11:40 AM</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📱</div>
                      <p>在左侧输入内容以查看预览</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 尺寸选择 */}
        <div className="mt-8 flex justify-center">
          <div className="flex flex-col items-center">
            <Button
              onClick={handleGenerate}
              disabled={!content.trim() || isGenerating}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold"
            >
              {isGenerating ? "生成中..." : "📸 生成Truth截图"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
