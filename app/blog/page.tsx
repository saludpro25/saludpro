"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LpNavbar1 } from '@/components/lp-navbar-1';
import { Footer2 } from '@/components/footer-2';
import Link from 'next/link';
import { FileText, Calendar, User, Eye, Search } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  author: string;
  cover_image: string | null;
  published_at: string;
  views: number;
  company: {
    company_name: string;
    slug: string;
  };
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const supabase = createClient();

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          company:companies(company_name, slug)
        `)
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error al cargar blogs:', error);
        return;
      }

      setBlogs(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background">
      <LpNavbar1 />
      
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Blog
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto">
            Bienvenido al blog de <a href="http://saludpro.net/" className="text-accent hover:underline font-semibold">SaludPro</a>
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
            Aquí compartimos las experiencias y conocimientos de especialistas, centros médicos y profesionales del bienestar. Aprende con historias reales, entrevistas, tips prácticos, guías digitales y todo lo que impulsa la salud moderna en Colombia.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent shadow-sm bg-white text-foreground"
            />
          </div>
        </div>

        {/* Blogs Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchQuery ? 'No se encontraron blogs con ese criterio' : 'No hay blogs publicados aún'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-primary/10 hover:border-accent/30"
              >
                {/* Cover Image */}
                <div className="relative h-48 bg-gradient-to-br from-accent/10 to-accent/20 overflow-hidden">
                  {blog.cover_image ? (
                    <img
                      src={blog.cover_image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText className="w-16 h-16 text-accent/30" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {blog.excerpt || 'Lee este artículo sobre salud y bienestar...'}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(blog.published_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{blog.views}</span>
                    </div>
                  </div>

                  {/* Company Tag */}
                  {blog.company && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link
                        href={`/${blog.company.slug}`}
                        className="text-xs text-accent hover:text-accent/80 font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {blog.company.company_name}
                      </Link>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer2 />
    </main>
  );
}
