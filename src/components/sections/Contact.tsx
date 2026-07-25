import React, { useState, useRef } from 'react';
import { profile } from '../../data/profile';
import { Section } from '../ui/Section';
import { FadeIn } from '../animation/FadeIn';
import { Check, Copy, AlertCircle, ArrowUpRight } from 'lucide-react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { socialProfiles } from '../../data/social';
import { motion } from 'framer-motion';
import { SocialIcon } from '../ui/SocialIcon';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const MagneticWrapper = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); reset(); }}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.5 }}
      className={`w-full ${isHovered ? 'z-50' : 'z-auto'}`}
    >
      {children}
    </motion.div>
  );
};

export const Contact: React.FC = () => {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { isCopied, copy } = useCopyToClipboard();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required.';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validEmail = profile.email;
  const validSocials = socialProfiles.filter(s => s.url !== 'TODO');

  return (
    <Section id="contact" className="bg-background border-none py-24 md:py-32 relative overflow-hidden">
      
      {/* Abstract Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[1200px] max-h-[1200px] bg-gradient-to-b from-transparent to-color-primary-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
        
        <FadeIn delay={0.1} direction="up" className="w-full">
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[140px] font-display font-black text-foreground tracking-tighter leading-none mb-8 hover:text-color-primary-500 transition-colors duration-700">
            LET'S TALK
          </h2>
          <p className="text-xl md:text-2xl font-light text-text-muted max-w-2xl mx-auto mb-24">
            Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </FadeIn>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-start text-left">
          
          {/* Direct Contact Info */}
          <FadeIn delay={0.3} direction="up" className="flex flex-col gap-16">
            <div>
              <span className="text-sm font-medium uppercase tracking-widest text-text-muted block mb-6">Contact</span>
              <div className="group flex items-end gap-6 cursor-pointer" onClick={() => copy(validEmail)}>
                <div className="flex flex-col">
                  <span className="text-3xl md:text-5xl font-display font-medium text-foreground group-hover:text-color-primary-500 transition-colors">
                    {validEmail}
                  </span>
                  <div className="h-[2px] w-0 bg-color-primary-500 group-hover:w-full transition-all duration-500 mt-2" />
                </div>
                <div className="pb-2 text-text-muted group-hover:text-color-primary-500 transition-colors">
                  {isCopied ? <Check size={24} /> : <Copy size={24} />}
                </div>
              </div>
            </div>

            <div>
              <span className="text-sm font-medium uppercase tracking-widest text-text-muted block mb-6">Socials</span>
              <div className="flex flex-col gap-4">
                {validSocials.map((social) => (
                  <a 
                    key={social.platform}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group flex items-center justify-between py-4 border-b border-border/50 hover:border-color-primary-500 transition-colors"
                  >
                    <span className="flex items-center gap-4 text-2xl font-display text-text-muted group-hover:text-foreground transition-colors capitalize">
                      <SocialIcon name={social.icon} className="w-6 h-6 group-hover:text-color-primary-500 transition-colors" />
                      {social.platform}
                    </span>
                    <ArrowUpRight size={24} className="text-text-muted group-hover:text-color-primary-500 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
            
            {profile.location && (
              <div>
                <span className="text-sm font-medium uppercase tracking-widest text-text-muted block mb-2">Based In</span>
                <span className="text-xl text-foreground font-display">{profile.location}</span>
              </div>
            )}
          </FadeIn>

          {/* Minimalist Form */}
          <FadeIn delay={0.4} direction="up">
            <div className="bg-surface-elevated/30 glass p-8 md:p-12 rounded-[40px] border border-border/50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-color-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {status === 'success' ? (
                <div className="relative z-10 flex flex-col items-center justify-center text-center py-20 gap-6">
                  <div className="w-20 h-20 bg-color-primary-500/20 rounded-full flex items-center justify-center text-color-primary-500 mb-4">
                    <Check size={40} />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-foreground">Message Sent</h3>
                  <p className="text-text-muted">Thanks for reaching out! I'll get back to you soon.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-8 px-6 py-2 border border-border rounded-full hover:bg-surface-elevated transition-colors text-sm uppercase tracking-widest text-text-muted hover:text-foreground"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-12 relative z-10">
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="What's your name?"
                      className="w-full bg-transparent border-b border-border/50 py-4 text-2xl md:text-3xl font-display text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-color-primary-500 transition-colors"
                      disabled={status === 'submitting'}
                    />
                    {errors.name && <span className="text-sm text-red-500 mt-2 flex items-center gap-2"><AlertCircle size={14}/>{errors.name}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="What's your email?"
                      className="w-full bg-transparent border-b border-border/50 py-4 text-2xl md:text-3xl font-display text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-color-primary-500 transition-colors"
                      disabled={status === 'submitting'}
                    />
                    {errors.email && <span className="text-sm text-red-500 mt-2 flex items-center gap-2"><AlertCircle size={14}/>{errors.email}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={4}
                      className="w-full bg-transparent border-b border-border/50 py-4 text-2xl md:text-3xl font-display text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-color-primary-500 transition-colors resize-none"
                      disabled={status === 'submitting'}
                    />
                    {errors.message && <span className="text-sm text-red-500 mt-2 flex items-center gap-2"><AlertCircle size={14}/>{errors.message}</span>}
                  </div>

                  <div className="mt-4">
                    <MagneticWrapper>
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="group/btn relative w-full overflow-hidden rounded-full bg-foreground text-background py-6 text-lg font-medium tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        <div className="absolute inset-0 bg-color-primary-500 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-out" />
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          {status === 'submitting' ? 'Sending...' : 'Send Message'}
                        </span>
                      </button>
                    </MagneticWrapper>
                  </div>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
};
