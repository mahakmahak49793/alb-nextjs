'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  IconButton,
  Divider,
  Box,
} from '@mui/material';
import { Color } from '@/assets/colors';
import {
  FormatBold,
  FormatItalic,
  StrikethroughS,
  Code,
  FormatUnderlined,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  Link as LinkIcon,
  LinkOff,
  Image as ImageIcon,
  Undo,
  Redo,
} from '@mui/icons-material';

// Types
interface StaticPageEditorProps {
  title: string;
  initialContent: string;
  createEndpoint?: string;
  hasTypeSelector?: boolean;
  selectedType?: string;
  onTypeChange?: (type: string) => void;
  loading?: boolean;
  onDescriptionChange?: (html: string) => void;
  onValidationError?: (hasError: boolean) => void;
}

interface InputFieldError {
  type?: string;
  description?: string;
}

interface ActiveFormats {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
}

const StaticPageEditor: React.FC<StaticPageEditorProps> = ({
  title,
  initialContent,
  createEndpoint,
  hasTypeSelector = false,
  selectedType = 'Astrologer',
  onTypeChange,
  loading: externalLoading = false,
  onDescriptionChange,
  onValidationError,
}) => {
  const [description, setDescription] = useState<string>('');
  const [inputFieldError, setInputFieldError] = useState<InputFieldError>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [currentFormat, setCurrentFormat] = useState<string>('Normal');
  const [activeFormats, setActiveFormats] = useState<ActiveFormats>({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
  });
  const editorRef = useRef<HTMLDivElement>(null);

  // Sync with parent
  useEffect(() => {
    setDescription(initialContent);
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent;
    }
  }, [initialContent]);

  const handleContentChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setDescription(content);
      onDescriptionChange?.(content);

      const stripped = content.replace(/<[^>]*>/g, '').trim();
      const hasError = !stripped || content === '<p><br></p>' || content === '';
      onValidationError?.(hasError);
      if (hasError) {
        setInputFieldError((prev) => ({ ...prev, description: 'Please Enter Description' }));
      } else {
        setInputFieldError((prev) => ({ ...prev, description: undefined }));
      }
    }
  };

  const executeCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateActiveFormats();
  };

  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikethrough: document.queryCommandState('strikethrough'),
    });
  };

  const handleBold = () => executeCommand('bold');
  const handleItalic = () => executeCommand('italic');
  const handleUnderline = () => executeCommand('underline');
  const handleStrikethrough = () => executeCommand('strikethrough');
  const handleAlignLeft = () => executeCommand('justifyLeft');
  const handleAlignCenter = () => executeCommand('justifyCenter');
  const handleAlignRight = () => executeCommand('justifyRight');
  const handleAlignJustify = () => executeCommand('justifyFull');
  const handleBulletList = () => executeCommand('insertUnorderedList');
  const handleNumberList = () => executeCommand('insertOrderedList');
  const handleUndo = () => executeCommand('undo');
  const handleRedo = () => executeCommand('redo');

  const handleQuote = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    if (selectedText) {
      const blockquote = document.createElement('blockquote');
      blockquote.style.borderLeft = '4px solid #ccc';
      blockquote.style.marginLeft = '0';
      blockquote.style.paddingLeft = '16px';
      blockquote.style.color = '#666';
      blockquote.style.fontStyle = 'italic';
      blockquote.textContent = selectedText;
      range.deleteContents();
      range.insertNode(blockquote);
      editorRef.current?.focus();
      handleContentChange();
    }
  };

  const handleCode = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    if (selectedText) {
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      Object.assign(pre.style, {
        backgroundColor: '#f5f5f5',
        padding: '12px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        overflow: 'auto',
        fontFamily: 'monospace',
      });
      code.textContent = selectedText;
      pre.appendChild(code);
      range.deleteContents();
      range.insertNode(pre);
      editorRef.current?.focus();
      handleContentChange();
    }
  };

  const handleLink = () => {
    const url = prompt('Enter URL:');
    if (url) executeCommand('createLink', url);
  };
  const handleUnlink = () => executeCommand('unlink');
  const handleImage = () => {
    const url = prompt('Enter image URL:');
    if (url) executeCommand('insertImage', url);
  };

  const handleFormatChange = (event: SelectChangeEvent<string>) => {
    const format = event.target.value;
    setCurrentFormat(format);
    const tag = format === 'Normal' ? 'p' : format.toLowerCase().replace(' ', '');
    executeCommand('formatBlock', `<${tag}>`);
  };

  const getToolbarButtonStyle = (isActive: boolean = false) => ({
    padding: '6px',
    minWidth: '36px',
    height: '36px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    backgroundColor: isActive ? '#e5e7eb' : '#fff',
    color: isActive ? '#1f2937' : '#4b5563',
    '&:hover': { backgroundColor: isActive ? '#d1d5db' : '#f3f4f6' },
  });

  return (
    <div>
      <div style={{ padding: '10px 0 20px 0', fontSize: '18px', fontWeight: '500', color: Color.black }}>
        {title} <span style={{ color: 'red' }}>*</span>
      </div>

      {/* Toolbar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '8px',
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '4px 4px 0 0',
          flexWrap: 'wrap',
        }}
      >
        <IconButton size="small" onClick={handleBold} title="Bold" sx={getToolbarButtonStyle(activeFormats.bold)}>
          <FormatBold fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={handleItalic} title="Italic" sx={getToolbarButtonStyle(activeFormats.italic)}>
          <FormatItalic fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={handleStrikethrough} title="Strikethrough" sx={getToolbarButtonStyle(activeFormats.strikethrough)}>
          <StrikethroughS fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={handleCode} title="Code Block">
          <Code fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={handleUnderline} title="Underline" sx={getToolbarButtonStyle(activeFormats.underline)}>
          <FormatUnderlined fontSize="small" />
        </IconButton>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        <IconButton size="small" onClick={handleAlignLeft} title="Align Left">
          <FormatAlignLeft fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={handleAlignCenter} title="Align Center">
          <FormatAlignCenter fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={handleAlignRight} title="Align Right">
          <FormatAlignRight fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={handleAlignJustify} title="Justify">
          <FormatAlignJustify fontSize="small" />
        </IconButton>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        <IconButton size="small" onClick={handleBulletList} title="Bullet List">
          <FormatListBulleted fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={handleNumberList} title="Numbered List">
          <FormatListNumbered fontSize="small" />
        </IconButton>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        <IconButton size="small" onClick={handleQuote} title="Quote">
          <FormatQuote fontSize="small" />
        </IconButton>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        <IconButton size="small" onClick={handleLink} title="Insert Link">
          <LinkIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={handleUnlink} title="Remove Link">
          <LinkOff fontSize="small" />
        </IconButton>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        <IconButton size="small" onClick={handleImage} title="Insert Image">
          <ImageIcon fontSize="small" />
        </IconButton>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        <Select
          value={currentFormat}
          onChange={handleFormatChange}
          size="small"
          variant="outlined"
          sx={{ minWidth: '120px', height: '36px', backgroundColor: '#fff' }}
        >
          <MenuItem value="Normal">Normal</MenuItem>
          <MenuItem value="Heading 1">Heading 1</MenuItem>
          <MenuItem value="Heading 2">Heading 2</MenuItem>
          <MenuItem value="Heading 3">Heading 3</MenuItem>
          <MenuItem value="Heading 4">Heading 4</MenuItem>
          <MenuItem value="Heading 5">Heading 5</MenuItem>
          <MenuItem value="Heading 6">Heading 6</MenuItem>
        </Select>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        <IconButton size="small" onClick={handleUndo} title="Undo">
          <Undo fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={handleRedo} title="Redo">
          <Redo fontSize="small" />
        </IconButton>
      </Box>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleContentChange}
        onMouseUp={updateActiveFormats}
        onKeyUp={updateActiveFormats}
        style={{
          minHeight: '400px',
          padding: '15px',
          border: inputFieldError.description ? '1px solid #D32F2F' : '1px solid #e5e7eb',
          borderTop: 'none',
          borderRadius: '0 0 4px 4px',
          backgroundColor: '#fff',
          outline: 'none',
          lineHeight: '1.6',
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
        }}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {inputFieldError.description && (
        <div style={{ color: '#D32F2F', fontSize: '13px', padding: '5px 15px 0 12px' }}>
          {inputFieldError.description}
        </div>
      )}
    </div>
  );
};

export default StaticPageEditor;