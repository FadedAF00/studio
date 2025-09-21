'use client';
import { useState } from 'react';
import { useAppContext } from '@/context/app-context';
import { Button } from '@/components/ui/button';
import { GetIcon } from '@/lib/icons';
import { useToast } from '@/hooks/use-toast';
import { Check, Copy } from 'lucide-react';
import Link from 'next/link';

export function SocialLinks() {
  const { config } = useAppContext();
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

  const visibleSocials = config.socials.filter((s) => s.visible);
  const visibleCopyButtons = config.copyButtons.filter((c) => c.visible);

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
          <div className="flex flex-1 items-center justify-between">
            <span className="truncate">{button.label}</span>
            {copiedId === button.id ? (
              <Check className="h-5 w-5 text-green-400" />
            ) : (
              <Copy className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </Button>
      ))}
    </div>
  );
}
