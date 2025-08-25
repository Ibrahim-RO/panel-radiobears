import { useState, type JSX } from "react"
import type { SocialMediaForm, SocialMediaType } from "../../schemas/socialMediaSchema"

type SocialMediaItemProps = {
  social: SocialMediaType
  icon: JSX.Element
  color: string
  onUpdate: ({ formData, id }: { formData: SocialMediaForm; id: SocialMediaType["id"] }) => void
  onToggle: (id: SocialMediaType["id"]) => void
}

export const SocialMediaItem = ({ social, icon, color, onUpdate, onToggle }: SocialMediaItemProps) => {
  const [url, setUrl] = useState(social.url)
  
    return (
      <section
        className={`max-w-4xl flex items-center justify-between gap-4 p-3 rounded-lg ${color}`}
      >
        <input
          type="checkbox"
          className="size-4 rounded-full border-0 
          checked:bg-blue-600 checked:border-blue-600
          transition-all cursor-pointer"
          checked={social.isActive}
          onChange={() => onToggle(social.id)}
        />
  
        {icon}
  
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onBlur={() => onUpdate({ formData: { url }, id: social.id })}
          className="bg-slate-100 border border-slate-300 text-black p-2 rounded-lg outline-0 flex-1"
        />
      </section>
    )
}
