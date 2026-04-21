import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Mail, Lock, User, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import FloatingDecorations from '@/components/game/FloatingDecorations';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [childName, setChildName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        if (!childName.trim()) {
          setError('請輸入孩子的名字！');
          setLoading(false);
          return;
        }
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        // Update profile with child name
        if (data.user) {
          await supabase.from('profiles').update({ child_name: childName }).eq('id', data.user.id);
        }
      }
    } catch (err: any) {
      setError(err.message === 'Invalid login credentials' ? '帳號或密碼錯誤' : err.message || '發生錯誤');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-amber-light via-game-pink-light to-game-blue-light flex items-center justify-center px-4 relative overflow-hidden">
      <FloatingDecorations />
      
      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-game-orange via-game-pink to-game-purple flex items-center justify-center gap-2">
            <Wand2 className="text-game-orange" size={28} /> OiKID 魔法單字庫
          </h1>
          <p className="text-muted-foreground font-semibold mt-2">
            {isLogin ? '歡迎回來！登入繼續你的學習旅程 🚀' : '建立帳號，開啟魔法學習之旅 ✨'}
          </p>
        </div>

        <div className="game-card bg-card/90 backdrop-blur-sm border-game-orange/20 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-bold text-foreground mb-1 block">孩子的名字</label>
                <div className="flex items-center bg-muted/50 rounded-xl px-3 py-2 border-2 border-border focus-within:border-game-orange/40 transition-colors">
                  <User size={18} className="text-muted-foreground mr-2 shrink-0" />
                  <input
                    type="text"
                    value={childName}
                    onChange={e => setChildName(e.target.value)}
                    placeholder="輸入孩子的名字"
                    maxLength={20}
                    className="bg-transparent border-none outline-none w-full text-foreground placeholder:text-muted-foreground/60"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-bold text-foreground mb-1 block">電子信箱</label>
              <div className="flex items-center bg-muted/50 rounded-xl px-3 py-2 border-2 border-border focus-within:border-game-orange/40 transition-colors">
                <Mail size={18} className="text-muted-foreground mr-2 shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="parent@example.com"
                  required
                  className="bg-transparent border-none outline-none w-full text-foreground placeholder:text-muted-foreground/60"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-foreground mb-1 block">密碼</label>
              <div className="flex items-center bg-muted/50 rounded-xl px-3 py-2 border-2 border-border focus-within:border-game-orange/40 transition-colors">
                <Lock size={18} className="text-muted-foreground mr-2 shrink-0" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="至少 6 個字元"
                  required
                  minLength={6}
                  className="bg-transparent border-none outline-none w-full text-foreground placeholder:text-muted-foreground/60"
                />
              </div>
            </div>

            {error && (
              <motion.p
                className="text-sm text-destructive font-semibold bg-destructive/10 rounded-xl px-4 py-2"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              >
                ⚠️ {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-game-orange to-game-pink text-white font-bold rounded-2xl shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
              whileTap={{ scale: 0.97 }}
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : null}
              {isLogin ? '🚀 登入' : '✨ 註冊'}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-sm text-muted-foreground font-semibold hover:text-game-orange transition-colors"
            >
              {isLogin ? '還沒有帳號？點此註冊' : '已有帳號？點此登入'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
