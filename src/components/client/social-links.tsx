'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GetIcon } from '@/lib/icons.tsx';
import { useToast } from '@/hooks/use-toast';
import { Check, Copy } from 'lucide-react';
import Link from 'next/link';
import type { SocialLink, CopyButton } from '@/lib/config';

export function SocialLinks({
  socials,
  copyButtons,
}: {
  socials: SocialLink[];
  copyButtons: CopyButton[];
}) {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (value: string, id: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: 'Copied to clipboard!',
      description: `${label}: ${value}`,
    });
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const visibleSocials = socials.filter((s) => s.visible);
  const visibleCopyButtons = copyButtons.filter((c) => c.visible);

  return (
    <div className="flex w-full flex-col gap-3">
      {visibleSocials.map((social) => (
        <Button
          key={social.id}
          variant="outline"
          size="lg"
          className="h-14 w-full justify-start border-2 border-primary/20 bg-primary/10 text-lg text-foreground transition-all hover:scale-105 hover:border-primary/50 hover:bg-primary/20"
          asChild
        >
          <Link href={social.url} target="_blank" rel="noopener noreferrer">
            <GetIcon name={social.icon} className="mr-4 h-6 w-6" />
            {social.label}
          </Link>
        </Button>
      ))}

      {visibleCopyButtons.map((button) => (
        <Button
          key={button.id}
          variant="outline"
          size="lg"
          className="relative h-14 w-full justify-start border-2 border-accent/20 bg-accent/10 text-lg text-foreground transition-all hover:scale-105 hover:border-accent/50 hover:bg-accent/20"
          onClick={() => handleCopy(button.value, button.id, button.label)}
        >
          <GetIcon name={button.icon} className="mr-4 h-6 w-6" />
          <div className="flex flex-1 items-center justify-between overflow-hidden">
            <div className="flex flex-col items-start overflow-hidden">
              <span className="truncate font-semibold">{button.label}</span>
              <span className="truncate text-sm text-muted-foreground">
                {button.value}
              </span>
            </div>
            {copiedId === button.id ? (
              <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
            ) : (
              <Copy className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
            )}
          </div>
        </Button>
      ))}
    </div>
  );
}
