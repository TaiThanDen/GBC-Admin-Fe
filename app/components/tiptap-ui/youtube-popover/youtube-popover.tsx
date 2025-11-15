"use client";

import { forwardRef, useCallback, useState } from "react";
import type { Editor } from "@tiptap/react";

// --- Hooks ---
import { useIsMobile } from "~/hooks/use-mobile";
import { useTiptapEditor } from "~/hooks/use-tiptap-editor";

// --- Icons ---
import { YoutubeIcon } from "~/components/tiptap-icons/youtube-icon";
import { CornerDownLeftIcon } from "~/components/tiptap-icons/corner-down-left-icon";

// --- Tiptap UI ---
import type { UseYoutubePopoverConfig } from "./use-youtube-popover";
import { useYoutubePopover } from "./use-youtube-popover";

// --- UI Primitives ---
import type { ButtonProps } from "~/components/tiptap-ui-primitive/button";
import { Button, ButtonGroup } from "~/components/tiptap-ui-primitive/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/tiptap-ui-primitive/popover";
import {
  Card,
  CardBody,
  CardItemGroup,
} from "~/components/tiptap-ui-primitive/card";
import { Input, InputGroup } from "~/components/tiptap-ui-primitive/input";

export interface YoutubeMainProps {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setYoutubeVideo: () => void;
  canInsert: boolean;
}

export interface YoutubePopoverProps
  extends Omit<ButtonProps, "type">,
    UseYoutubePopoverConfig {
  onOpenChange?: (isOpen: boolean) => void;
}

/**
 * YouTube button component for triggering the YouTube popover
 */
export const YoutubeButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        type="button"
        className={className}
        data-style="ghost"
        role="button"
        tabIndex={-1}
        aria-label="YouTube Video"
        tooltip="YouTube Video"
        ref={ref}
        {...props}
      >
        {children || <YoutubeIcon className="tiptap-button-icon" />}
      </Button>
    );
  }
);

YoutubeButton.displayName = "YoutubeButton";

/**
 * Main content component for the YouTube popover
 */
const YoutubeMain: React.FC<YoutubeMainProps> = ({
  url,
  setUrl,
  setYoutubeVideo,
  canInsert,
}) => {
  const isMobile = useIsMobile();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setYoutubeVideo();
    }
  };

  return (
    <Card
      style={{
        ...(isMobile ? { boxShadow: "none", border: 0 } : {}),
      }}
    >
      <CardBody
        style={{
          ...(isMobile ? { padding: 0 } : {}),
        }}
      >
        <CardItemGroup orientation="horizontal">
          <InputGroup>
            <Input
              type="url"
              placeholder="Paste YouTube link..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </InputGroup>

          <ButtonGroup orientation="horizontal">
            <Button
              type="button"
              onClick={setYoutubeVideo}
              title="Insert video"
              disabled={!canInsert}
              data-style="ghost"
            >
              <CornerDownLeftIcon className="tiptap-button-icon" />
            </Button>
          </ButtonGroup>
        </CardItemGroup>
      </CardBody>
    </Card>
  );
};

/**
 * YouTube content component for standalone use
 */
export const YoutubeContent: React.FC<{
  editor?: Editor | null;
}> = ({ editor }) => {
  const youtubePopover = useYoutubePopover({
    editor,
  });

  return <YoutubeMain {...youtubePopover} />;
};

/**
 * Full YouTube popover component with button and content
 */
export const YoutubePopover = forwardRef<
  HTMLButtonElement,
  YoutubePopoverProps
>(({ editor: providedEditor, onOpenChange, ...buttonProps }, ref) => {
  const { editor } = useTiptapEditor(providedEditor);
  const [isOpen, setIsOpen] = useState(false);

  const youtubePopover = useYoutubePopover({ editor });

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      onOpenChange?.(open);
    },
    [onOpenChange]
  );

  if (!youtubePopover.isVisible) {
    return null;
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <YoutubeButton ref={ref} {...buttonProps} />
      </PopoverTrigger>
      <PopoverContent>
        <YoutubeMain {...youtubePopover} />
      </PopoverContent>
    </Popover>
  );
});

YoutubePopover.displayName = "YoutubePopover";
