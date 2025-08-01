import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { newsData, getNewsById } from "@/lib/newsData";

interface NewsDetailPageProps {
  params: Promise<{ id: string }>;
}
export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  const newsId = parseInt(id);
  const news = getNewsById(newsId);

  if (!news) {
    notFound();
  }

  // Related news (excluding current news)
  const relatedNews = newsData.filter((item) => item.id !== newsId).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {news.category}
              </span>
              <span className="text-white text-sm">{news.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {news.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/news">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to News
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="mb-8">
                <CardContent className="p-8">
                  {/* Article Meta */}
                  <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6 pb-6 border-b">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{news.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>By {news.author}</span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div
                    className="prose prose-lg max-w-none 
                               prose-headings:text-gray-900 prose-headings:font-bold
                               prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                               prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                               prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                               prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
                               prose-ul:space-y-2 prose-ol:space-y-2
                               prose-li:text-gray-700
                               prose-strong:text-gray-900 prose-strong:font-semibold
                               prose-em:text-gray-600 prose-em:italic
                               prose-a:text-blue-600 prose-a:hover:text-blue-800"
                    dangerouslySetInnerHTML={{ __html: news.content }}
                  />

                  {/* Share Section */}
                  <div className="mt-8 pt-6 border-t">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Share this article
                      </h3>
                      <div className="flex space-x-3">
                        <Button size="sm" variant="outline">
                          Share on Facebook
                        </Button>
                        <Button size="sm" variant="outline">
                          Share on Twitter
                        </Button>
                        <Button size="sm" variant="outline">
                          Share on LinkedIn
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Related News */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Related News
                  </h3>
                  <div className="space-y-6">
                    {relatedNews.map((relatedItem) => (
                      <div key={relatedItem.id} className="group">
                        <Link href={`/news/${relatedItem.id}`}>
                          <div className="flex space-x-4">
                            <img
                              src={relatedItem.image}
                              alt={relatedItem.title}
                              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm leading-tight mb-2">
                                {relatedItem.title}
                              </h4>
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <Calendar className="h-3 w-3" />
                                <span>{relatedItem.date}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="w-full"
                    >
                      <Link href="/news">View All News</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return newsData.map((news) => ({
    id: news.id.toString(),
  }));
}
