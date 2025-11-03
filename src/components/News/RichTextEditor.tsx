import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import { useEffect } from "react"

type Props = {
    value: string
    onChange: (v: string) => void
}

export const RichTextEditor = ({ value, onChange }: Props) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
            }),
            Underline,
            Image,
            Link.configure({
                openOnClick: false,
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],
        content: value || "",
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
        editorProps: {
            attributes: {
                class:
                    "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none p-4 border rounded-lg bg-white min-h-[250px]",
            },
        },
    })

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value)
        }
    }, [value])

    if (!editor) return null

    // Función para insertar imagen
    const addImage = () => {
        const url = window.prompt("URL de la imagen:")
        if (url) editor.chain().focus().setImage({ src: url }).run()
    }

    // Función para insertar link
    const setLink = () => {
        const url = window.prompt("URL del enlace:")
        if (url) editor.chain().focus().setLink({ href: url }).run()
    }

    return (
        <div className="space-y-2">
            {/* 🧭 Barra de herramientas */}
            <div
                className="flex flex-wrap gap-2 border p-2 rounded-lg bg-gray-50"
                onMouseDown={(e) => e.preventDefault()} // ✅ evita que el form se envíe
            >
                {/* Texto */}
                <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor, "bold")}>
                    <b>B</b>
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor, "italic")}>
                    <i>I</i>
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btn(editor, "underline")}>
                    <u>U</u>
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={btn(editor, "strike")}>
                    <s>S</s>
                </button>

                {/* Encabezados */}
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btn(editor, "heading", 1)}>
                    H1
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor, "heading", 2)}>
                    H2
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(editor, "heading", 3)}>
                    H3
                </button>

                {/* Listas */}
                <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor, "bulletList")}>
                    • Lista
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor, "orderedList")}>
                    1. Lista
                </button>

                {/* Alineación */}
                <button type="button" onClick={() => editor.chain().focus().setTextAlign("left").run()} className="px-2 py-1 rounded hover:bg-gray-200">⯇</button>
                <button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()} className="px-2 py-1 rounded hover:bg-gray-200">≡</button>
                <button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()} className="px-2 py-1 rounded hover:bg-gray-200">⯈</button>

                {/* Imagen / Link */}
                <button type="button" onClick={addImage} className="px-2 py-1 rounded hover:bg-gray-200">🖼️</button>
                <button type="button" onClick={setLink} className="px-2 py-1 rounded hover:bg-gray-200">🔗</button>

                {/* Undo / Redo */}
                <button type="button" onClick={() => editor.chain().focus().undo().run()} className="px-2 py-1 rounded hover:bg-gray-200">↶</button>
                <button type="button" onClick={() => editor.chain().focus().redo().run()} className="px-2 py-1 rounded hover:bg-gray-200">↷</button>
            </div>

            {/* ✏️ Editor */}
            <EditorContent editor={editor} />
        </div>
    )
}

// 🧩 Helper: para aplicar estilo activo a los botones
function btn(editor: any, type: string, level?: number) {
    const active = level ? editor.isActive(type, { level }) : editor.isActive(type)
    return `px-2 py-1 rounded transition ${active ? "bg-amber-400 text-white" : "hover:bg-gray-200"
        }`
}
