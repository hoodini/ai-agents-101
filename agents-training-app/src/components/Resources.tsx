import { ExternalLink, BookOpen, Code2, Database, Sparkles, Github } from 'lucide-react';
import { useStore } from '../store/useStore';
import { t } from '../utils/translations';

interface Resource {
  id: string;
  title: string;
  titleHe: string;
  description: string;
  descriptionHe: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  categoryHe: string;
}

const resources: Resource[] = [
  {
    id: 'aws-agentcore',
    title: 'AWS AgentCore with Strands',
    titleHe: 'AWS AgentCore עם Strands',
    description: 'Comprehensive samples and use cases for building AI agents using Amazon Bedrock AgentCore with Strands framework. Features production-ready patterns and best practices for enterprise agent development.',
    descriptionHe: 'דוגמאות ומקרי שימוש מקיפים לבניית סוכני AI באמצעות Amazon Bedrock AgentCore עם מסגרת Strands. כולל תבניות מוכנות לייצור ושיטות עבודה מומלצות לפיתוח סוכנים ארגוניים.',
    url: 'https://github.com/awslabs/amazon-bedrock-agentcore-samples/tree/main/02-use-cases',
    icon: Database,
    category: 'AWS / Enterprise',
    categoryHe: 'AWS / ארגוני',
  },
  {
    id: 'aws-strands',
    title: 'AWS Strands Examples',
    titleHe: 'דוגמאות AWS Strands',
    description: 'Official documentation and examples for AWS Strands agents framework. Learn how to build sophisticated multi-agent systems with state management, tool integration, and orchestration patterns.',
    descriptionHe: 'תיעוד ודוגמאות רשמיות למסגרת סוכני AWS Strands. למד כיצד לבנות מערכות רב-סוכניות מתוחכמות עם ניהול מצב, אינטגרציית כלים ותבניות תזמור.',
    url: 'https://strandsagents.com/latest/documentation/docs/examples/',
    icon: Code2,
    category: 'AWS / Advanced',
    categoryHe: 'AWS / מתקדם',
  },
  {
    id: 'cohere-onboarding',
    title: 'Cohere Agent Onboarding',
    titleHe: 'מדריך התחלה ל-Cohere',
    description: 'Get started with Cohere\'s powerful AI platform. Comprehensive guide covering agent development, RAG implementations, embeddings, and enterprise-grade AI applications with Cohere\'s APIs.',
    descriptionHe: 'התחל עם פלטפורמת ה-AI העוצמתית של Cohere. מדריך מקיף המכסה פיתוח סוכנים, יישומי RAG, הטמעות ויישומי AI ברמה ארגונית עם ה-APIs של Cohere.',
    url: 'https://docs.cohere.com/docs/build-things-with-cohere',
    icon: Sparkles,
    category: 'Cohere / Getting Started',
    categoryHe: 'Cohere / התחלה',
  },
  {
    id: 'cohere-cookbook',
    title: 'Cohere Agents Cookbook',
    titleHe: 'ספר מתכונים ל-Cohere Agents',
    description: 'Collection of practical recipes and patterns for building AI agents with Cohere. Includes advanced techniques for multi-step reasoning, tool use, retrieval-augmented generation, and production deployments.',
    descriptionHe: 'אוסף מתכונים ותבניות מעשיות לבניית סוכני AI עם Cohere. כולל טכניקות מתקדמות לחשיבה רב-שלבית, שימוש בכלים, יצירה משופרת באחזור ופריסות ייצור.',
    url: 'https://docs.cohere.com/page/cookbooks#agents',
    icon: BookOpen,
    category: 'Cohere / Cookbook',
    categoryHe: 'Cohere / מתכונים',
  },
  {
    id: 'langchain-cookbook',
    title: 'LangChain Agents Cookbook',
    titleHe: 'ספר מתכונים ל-LangChain Agents',
    description: 'Extensive collection of LangChain tutorials and use cases. Learn practical implementations of agents, chains, memory systems, and integrations. Perfect for hands-on learning with real-world examples.',
    descriptionHe: 'אוסף נרחב של מדריכים ומקרי שימוש ל-LangChain. למד יישומים מעשיים של סוכנים, שרשראות, מערכות זיכרון ואינטגרציות. מושלם ללמידה מעשית עם דוגמאות מהעולם האמיתי.',
    url: 'https://github.com/gkamradt/langchain-tutorials/blob/main/LangChain%20Cookbook%20Part%202%20-%20Use%20Cases.ipynb',
    icon: Github,
    category: 'LangChain / Tutorials',
    categoryHe: 'LangChain / מדריכים',
  },
];

export function Resources() {
  const { language } = useStore();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-neural mb-4">
          {t(language, 'resources.title')}
        </h1>
        <p className="text-base sm:text-lg text-white/70 max-w-3xl">
          {t(language, 'resources.subtitle')}
        </p>
      </div>

      {/* Resources Grid */}
      <div className="grid gap-4 sm:gap-6 md:gap-8">
        {resources.map((resource) => {
          const Icon = resource.icon;
          const title = language === 'he' ? resource.titleHe : resource.title;
          const description = language === 'he' ? resource.descriptionHe : resource.description;
          const category = language === 'he' ? resource.categoryHe : resource.category;

          return (
            <div
              key={resource.id}
              className="glass p-4 sm:p-6 md:p-8 rounded-xl border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 hover-lift group"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                        {title}
                      </h3>
                      <div className="inline-block px-2 sm:px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs sm:text-sm text-cyan-400">
                        {category}
                      </div>
                    </div>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 glass hover:glass-strong rounded-lg transition-all hover-lift border border-cyan-500/30 text-sm sm:text-base text-white/80 hover:text-cyan-400 group-hover:border-cyan-400/50 whitespace-nowrap self-start sm:self-auto"
                    >
                      <span>{t(language, 'resources.visitResource')}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="mt-8 sm:mt-12 p-4 sm:p-6 glass rounded-xl border border-purple-500/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex-shrink-0">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-base sm:text-lg font-bold text-white mb-2">
              {t(language, 'resources.footerTitle')}
            </h4>
            <p className="text-sm sm:text-base text-white/60">
              {t(language, 'resources.footerText')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
