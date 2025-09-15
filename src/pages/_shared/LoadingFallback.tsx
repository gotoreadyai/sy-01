// ================================
// path: src/pages/_shared/LoadingFallback.tsx
// ================================
export const LoadingFallback = ({ text, colorClass }: { text: string; colorClass: string }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="text-center">
        <div className={`inline-block h-12 w-12 animate-spin rounded-full border-4 border-current border-r-transparent ${colorClass}`} />
        <p className="mt-4 text-muted-foreground">{text}</p>
      </div>
    </div>
  );