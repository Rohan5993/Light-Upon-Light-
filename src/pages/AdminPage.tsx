import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import type { Session, User } from "@supabase/supabase-js";
import {
  createBlogPost,
  deleteBlogPost,
  getPostByIdForAdmin,
  isCurrentUserBlogEditor,
  listAllPostsForAdmin,
  slugifyTitle,
  updateBlogPost,
  uploadBlogImage,
  type BlogPostInput,
} from "../services/blogService";
import {
  getSupabase,
  isSupabaseConfigured,
  type BlogPostRow,
} from "../lib/supabase";
import Seo from "../components/Seo";
import { PAGE_SEO } from "../data/seo";

function AdminShell({
  children,
  user,
  isEditor,
  onSignOut,
}: {
  children: ReactNode;
  user: User | null;
  isEditor: boolean;
  onSignOut: () => void;
}) {
  return (
    <div className="min-h-dvh bg-[#f7f5f2] text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-purple-700">
              Light Upon Light
            </p>
            <h1 className="text-lg font-semibold">Blog admin</h1>
          </div>
          {user ? (
            <div className="flex items-center gap-3 text-sm">
              <span className="hidden max-w-[12rem] truncate text-gray-600 sm:inline">
                {user.email}
              </span>
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                View site
              </Link>
              <button
                type="button"
                onClick={onSignOut}
                className="rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-50"
              >
                Log out
              </button>
            </div>
          ) : null}
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8">
        {user && !isEditor ? (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            You’re signed in, but this Google account is not on the editor list.
            Ask an admin to add <strong>{user.email}</strong> in Supabase →{" "}
            <code>cms_blog_editors</code>.
          </div>
        ) : null}
        {children}
      </main>
    </div>
  );
}

function LoginPanel({ onLogin }: { onLogin: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!isSupabaseConfigured) {
    return (
      <div className="rounded-xl border border-red-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Admin not configured</h2>
        <p className="mt-2 text-sm text-gray-600">
          Set <code>VITE_SUPABASE_URL</code> and{" "}
          <code>VITE_SUPABASE_ANON_KEY</code>, then redeploy.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight">Sign in to edit blogs</h2>
      <p className="mt-2 text-sm text-gray-600">
        Use your Google account. Only allowlisted emails can publish.
      </p>
      {error ? (
        <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      <button
        type="button"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setError(null);
          try {
            await onLogin();
          } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed");
            setBusy(false);
          }
        }}
        className="mt-6 inline-flex items-center justify-center rounded-md bg-[#7107e7] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#5c06c0] disabled:opacity-60"
      >
        {busy ? "Redirecting…" : "Login with Google"}
      </button>
    </div>
  );
}

function PostList({
  isEditor,
}: {
  isEditor: boolean;
}) {
  const [posts, setPosts] = useState<BlogPostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const rows = await listAllPostsForAdmin();
        if (mounted) setPosts(rows);
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load posts");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  async function onDelete(id: string, title: string) {
    if (!isEditor) return;
    if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) return;
    try {
      await deleteBlogPost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Delete failed");
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Blog posts</h2>
        {isEditor ? (
          <Link
            to="/admin/posts/new"
            className="rounded-md bg-[#7107e7] px-4 py-2 text-sm font-medium text-white hover:bg-[#5c06c0]"
          >
            New post
          </Link>
        ) : null}
      </div>
      {loading ? <p className="text-sm text-gray-500">Loading…</p> : null}
      {error ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      ) : null}
      {!loading && !error && posts.length === 0 ? (
        <p className="text-sm text-gray-600">No posts yet.</p>
      ) : null}
      <ul className="space-y-3">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="truncate font-medium">{post.title}</p>
              <p className="mt-0.5 text-xs text-gray-500">
                {post.date_label || "No date"} ·{" "}
                {post.published ? "Published" : "Draft"}
                {post.is_featured ? " · Featured" : ""}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Link
                to={`/blog/${post.slug}`}
                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
              >
                View
              </Link>
              {isEditor ? (
                <>
                  <Link
                    to={`/admin/posts/${post.id}`}
                    className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDelete(post.id, post.title)}
                    className="rounded-md border border-red-200 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function emptyForm(): BlogPostInput {
  return {
    slug: "",
    title: "",
    excerpt: "",
    date_label: "",
    category: "",
    body: "",
    image_url: "",
    is_featured: false,
    published: true,
  };
}

function PostEditor({ isEditor }: { isEditor: boolean }) {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const [form, setForm] = useState<BlogPostInput>(emptyForm());
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (isNew) return;
    let mounted = true;
    (async () => {
      try {
        const row = await getPostByIdForAdmin(id!);
        if (!mounted) return;
        if (!row) {
          setError("Post not found");
          return;
        }
        setForm({
          slug: row.slug,
          title: row.title,
          excerpt: row.excerpt,
          date_label: row.date_label,
          category: row.category,
          body: row.body,
          image_url: row.image_url,
          is_featured: row.is_featured,
          published: row.published,
        });
        setSlugTouched(true);
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load post");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id, isNew]);

  if (!isEditor) {
    return <Navigate to="/admin" replace />;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload: BlogPostInput = {
        ...form,
        slug: form.slug || slugifyTitle(form.title),
        title: form.title.trim(),
        excerpt: form.excerpt.trim(),
      };
      if (!payload.title) throw new Error("Title is required");
      if (!payload.slug) throw new Error("Slug is required");

      if (isNew) {
        const created = await createBlogPost(payload);
        navigate(`/admin/posts/${created.id}`, { replace: true });
      } else {
        await updateBlogPost(id!, payload);
        navigate("/admin");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function onFileChange(file: File | null) {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadBlogImage(file);
      setForm((prev) => ({ ...prev, image_url: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-gray-500">Loading post…</p>;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">
          {isNew ? "New blog post" : "Edit blog post"}
        </h2>
        <Link to="/admin" className="text-sm text-gray-600 hover:text-gray-900">
          Back to list
        </Link>
      </div>

      {error ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      ) : null}

      <label className="block text-sm">
        <span className="mb-1 block font-medium">Title</span>
        <input
          required
          value={form.title}
          onChange={(e) => {
            const title = e.target.value;
            setForm((prev) => ({
              ...prev,
              title,
              slug: slugTouched ? prev.slug : slugifyTitle(title),
            }));
          }}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium">URL slug</span>
        <input
          required
          value={form.slug}
          onChange={(e) => {
            setSlugTouched(true);
            setForm((prev) => ({ ...prev, slug: slugifyTitle(e.target.value) }));
          }}
          className="w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium">Excerpt</span>
        <textarea
          required
          rows={3}
          value={form.excerpt}
          onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Date label</span>
          <input
            placeholder="SEPTEMBER 07, 2026"
            value={form.date_label}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, date_label: e.target.value }))
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Category</span>
          <input
            value={form.category}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, category: e.target.value }))
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium">Cover image</span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
          className="block w-full text-sm"
        />
        {uploading ? (
          <p className="mt-1 text-xs text-gray-500">Uploading…</p>
        ) : null}
        {form.image_url ? (
          <img
            src={form.image_url}
            alt=""
            className="mt-3 max-h-48 rounded-md border border-gray-200 object-cover"
          />
        ) : null}
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium">Body</span>
        <textarea
          required
          rows={14}
          value={form.body}
          onChange={(e) => setForm((prev) => ({ ...prev, body: e.target.value }))}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="Use blank lines between paragraphs."
        />
      </label>

      <div className="flex flex-wrap gap-6 text-sm">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.is_featured}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, is_featured: e.target.checked }))
            }
          />
          Featured on homepage
        </label>
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, published: e.target.checked }))
            }
          />
          Published
        </label>
      </div>

      <button
        type="submit"
        disabled={saving || uploading}
        className="rounded-md bg-[#7107e7] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#5c06c0] disabled:opacity-60"
      >
        {saving ? "Saving…" : isNew ? "Create post" : "Save changes"}
      </button>
    </form>
  );
}

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [isEditor, setIsEditor] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setReady(true);
      return;
    }

    const supabase = getSupabase();
    let mounted = true;

    async function refresh(next: Session | null) {
      setSession(next);
      if (next?.user) {
        try {
          const editor = await isCurrentUserBlogEditor();
          if (mounted) setIsEditor(editor);
        } catch {
          if (mounted) setIsEditor(false);
        }
      } else if (mounted) {
        setIsEditor(false);
      }
      if (mounted) setReady(true);
    }

    supabase.auth.getSession().then(({ data }) => refresh(data.session));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, next) => {
      void refresh(next);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const redirectTo = `${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, "")}/admin`;
    const { error } = await getSupabase().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (error) throw error;
  }

  async function signOut() {
    await getSupabase().auth.signOut();
    setSession(null);
    setIsEditor(false);
  }

  if (!ready) {
    return (
      <>
        <Seo {...PAGE_SEO.admin} />
        <div className="flex min-h-dvh items-center justify-center bg-[#f7f5f2] text-sm text-gray-600">
          Loading admin…
        </div>
      </>
    );
  }

  return (
    <>
      <Seo {...PAGE_SEO.admin} />
      <AdminShell
        user={session?.user ?? null}
        isEditor={isEditor}
        onSignOut={() => void signOut()}
      >
        {!session ? (
          <LoginPanel onLogin={signInWithGoogle} />
        ) : (
          <Routes>
            <Route index element={<PostList isEditor={isEditor} />} />
            <Route path="posts/new" element={<PostEditor isEditor={isEditor} />} />
            <Route path="posts/:id" element={<PostEditor isEditor={isEditor} />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        )}
      </AdminShell>
    </>
  );
}
