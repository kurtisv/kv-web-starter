import { MessageSquare, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Note {
  id: string;
  content: string;
  author: string;
  date: string;
  isInternal?: boolean;
}

interface ClientNotesPanelProps {
  notes: Note[];
  className?: string;
}

export function ClientNotesPanel({ notes, className }: ClientNotesPanelProps) {
  return (
    <div className={cn("rounded-xl border bg-card shadow-sm overflow-hidden", className)}>
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium">Notes internes</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
          aria-label="Ajouter une note"
        >
          <PlusCircle className="h-3.5 w-3.5" />
          Ajouter
        </button>
      </div>

      {notes.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <MessageSquare className="h-8 w-8 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">Aucune note pour ce client</p>
        </div>
      ) : (
        <div className="divide-y">
          {notes.map((note) => (
            <div key={note.id} className="px-5 py-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-medium">{note.author}</p>
                <p className="text-xs text-muted-foreground">{note.date}</p>
              </div>
              <p className="text-sm text-muted-foreground">{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
