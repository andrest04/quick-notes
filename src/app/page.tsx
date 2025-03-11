'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

// Definimos la estructura de una nota
interface Note {
  text: string;
  completed: boolean;
}

export default function QuickNotes() {
  // Estado para almacenar las notas
  const [notes, setNotes] = useState<Note[]>([]);
  // Estado para manejar el input de nueva nota
  const [input, setInput] = useState('');

  // Agregar una nueva nota
  const addNote = () => {
    if (!input.trim()) return; // Evita agregar notas vacías
    setNotes([...notes, { text: input, completed: false }]);
    setInput(''); // Limpia el input después de agregar
  };

  // Eliminar una nota por su índice
  const removeNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  // Marcar o desmarcar una nota como completada
  const toggleComplete = (index: number) => {
    setNotes(
      notes.map((note, i) =>
        i === index ? { ...note, completed: !note.completed } : note
      )
    );
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      {/* Input y botón para agregar notas */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe una nota..."
        />
        <Button onClick={addNote}>Agregar</Button>
      </div>

      {/* Mostrar la cantidad total de notas */}
      <p className="text-sm text-gray-600">Total de notas: {notes.length}</p>

      {/* Lista de notas */}
      <div className="space-y-2">
        {notes.map((note, index) => (
          <Card key={index} className="flex justify-between items-center p-3">
            <div className="flex items-center gap-2">
              {/* Checkbox para marcar como completado */}
              <Checkbox checked={note.completed} onCheckedChange={() => toggleComplete(index)} />
              {/* Mostrar el texto de la nota */}
              <CardContent className={`p-0 ${note.completed ? 'line-through text-gray-500' : ''}`}>
                {note.text}
              </CardContent>
            </div>
            {/* Botón para eliminar la nota */}
            <Button variant="destructive" onClick={() => removeNote(index)}>
              Eliminar
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
