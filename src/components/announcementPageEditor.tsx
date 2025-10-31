'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Grid, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, IconButton, Divider, Box } from '@mui/material';
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

// Types specific to Announcements
interface AnnouncementPageEditorProps {
  initialContent: string;
  createEndpoint: string;
  announcementId?: string;
  editMode?: boolean;
  loading?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface InputFieldError {
  description?: string;
}

interface ApiPayload {
  description: string;
  announcementId?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  announcement?: {
    _id: string;
    description: string;
    astrologerId: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

interface ActiveFormats {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
}

const AnnouncementPageEditor: React.FC<AnnouncementPageEditorProps> = ({
  initialContent,
  createEndpoint,
  announcementId,
  editMode = false,
  loading: externalLoading = false,
  onSuccess,
  onCancel,
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

  // Handle Input Field Error
 // Handle Input Field Error
const handleInputFieldError = (input: keyof InputFieldError, value: string | undefined) => {
  setInputFieldError((prev) => ({ ...prev, [input]: value }));
};

  // Execute command
  const executeCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateActiveFormats();
  };

  // Update active formats based on cursor position
  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikethrough: document.queryCommandState('strikethrough'),
    });
  };

  // Handle toolbar actions
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
      const codeBlock = document.createElement('pre');
      const code = document.createElement('code');
      codeBlock.style.backgroundColor = '#f5f5f5';
      codeBlock.style.padding = '12px';
      codeBlock.style.borderRadius = '4px';
      codeBlock.style.border = '1px solid #ddd';
      codeBlock.style.overflow = 'auto';
      codeBlock.style.fontFamily = 'monospace';
      code.textContent = selectedText;
      codeBlock.appendChild(code);
      
      range.deleteContents();
      range.insertNode(codeBlock);
      
      editorRef.current?.focus();
      handleContentChange();
    }
  };
  
  const handleUndo = () => executeCommand('undo');
  const handleRedo = () => executeCommand('redo');
  
  const handleLink = () => {
    const url = prompt('Enter URL:');
    if (url) executeCommand('createLink', url);
  };

  const handleUnlink = () => executeCommand('unlink');

  const handleImage = () => {
    const url = prompt('Enter image URL:');
    if (url) executeCommand('insertImage', url);
  };

  // Handle format dropdown change
  const handleFormatChange = (event: SelectChangeEvent<string>) => {
    const format = event.target.value;
    setCurrentFormat(format);
    
    switch(format) {
      case 'Heading 1':
        executeCommand('formatBlock', '<h1>');
        break;
      case 'Heading 2':
        executeCommand('formatBlock', '<h2>');
        break;
      case 'Heading 3':
        executeCommand('formatBlock', '<h3>');
        break;
      case 'Heading 4':
        executeCommand('formatBlock', '<h4>');
        break;
      case 'Heading 5':
        executeCommand('formatBlock', '<h5>');
        break;
      case 'Heading 6':
        executeCommand('formatBlock', '<h6>');
        break;
      case 'Normal':
        executeCommand('formatBlock', '<p>');
        break;
      default:
        executeCommand('formatBlock', '<p>');
    }
  };

  // Handle Validation
  const handleValidation = (): boolean => {
    let isValid = true;

    const strippedDescription = description.replace(/<[^>]*>/g, '').trim();
    if (!strippedDescription || description === '<p><br></p>' || description === '') {
handleInputFieldError('description', 'Please Enter Announcement Description');
      isValid = false;
    }

    return isValid;
  };

  // Handle Submit
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!handleValidation()) return;

    try {
      setSubmitting(true);
      
      const payload: ApiPayload = {
        description: description,
      };

      // Include ID for edit mode
      if (editMode && announcementId) {
        payload.announcementId = announcementId;
      }

      const response = await fetch(createEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save announcement');
      }

      const result: ApiResponse = await response.json();
      
      if (result.success) {
        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        } else {
          // Default success behavior
          alert(result.message || (editMode ? 'Announcement updated successfully!' : 'Announcement created successfully!'));
        }
      } else {
        throw new Error(result.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Error saving announcement:', error);
      alert(error instanceof Error ? error.message : 'Failed to save announcement. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle content change
  const handleContentChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setDescription(content);
      if (inputFieldError.description) {
handleInputFieldError('description', undefined);
      }
    }
  };

  // Update editor when initialContent changes
  useEffect(() => {
    if (initialContent && initialContent !== description) {
      setDescription(initialContent);
      if (editorRef.current) {
        editorRef.current.innerHTML = initialContent;
      }
    }
  }, [initialContent]);

  // Track selection changes to update active formats
  useEffect(() => {
    const handleSelectionChange = () => {
      if (editorRef.current?.contains(document.activeElement)) {
        updateActiveFormats();
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  const getToolbarButtonStyle = (isActive: boolean = false) => ({
    padding: '6px',
    minWidth: '36px',
    height: '36px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    backgroundColor: isActive ? '#e5e7eb' : '#fff',
    color: isActive ? '#1f2937' : '#4b5563',
    '&:hover': {
      backgroundColor: isActive ? '#d1d5db' : '#f3f4f6',
    }
  });

  return (
   <>

      {externalLoading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
          Loading announcement editor...
        </div>
      ) : (
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
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
              {/* Text Formatting */}
              <IconButton size="small" onClick={handleBold} title="Bold" sx={getToolbarButtonStyle(activeFormats.bold)}>
                <FormatBold fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleItalic} title="Italic" sx={getToolbarButtonStyle(activeFormats.italic)}>
                <FormatItalic fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleStrikethrough} title="Strikethrough" sx={getToolbarButtonStyle(activeFormats.strikethrough)}>
                <StrikethroughS fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleCode} title="Code Block" sx={getToolbarButtonStyle()}>
                <Code fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleUnderline} title="Underline" sx={getToolbarButtonStyle(activeFormats.underline)}>
                <FormatUnderlined fontSize="small" />
              </IconButton>

              <Divider orientation="vertical" flexItem sx={{ mx: 0.5, backgroundColor: '#d1d5db' }} />

              {/* Alignment */}
              <IconButton size="small" onClick={handleAlignLeft} title="Align Left" sx={getToolbarButtonStyle()}>
                <FormatAlignLeft fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleAlignCenter} title="Align Center" sx={getToolbarButtonStyle()}>
                <FormatAlignCenter fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleAlignRight} title="Align Right" sx={getToolbarButtonStyle()}>
                <FormatAlignRight fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleAlignJustify} title="Justify" sx={getToolbarButtonStyle()}>
                <FormatAlignJustify fontSize="small" />
              </IconButton>

              <Divider orientation="vertical" flexItem sx={{ mx: 0.5, backgroundColor: '#d1d5db' }} />

              {/* Lists */}
              <IconButton size="small" onClick={handleBulletList} title="Bullet List" sx={getToolbarButtonStyle()}>
                <FormatListBulleted fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleNumberList} title="Numbered List" sx={getToolbarButtonStyle()}>
                <FormatListNumbered fontSize="small" />
              </IconButton>

              <Divider orientation="vertical" flexItem sx={{ mx: 0.5, backgroundColor: '#d1d5db' }} />

              {/* Quote */}
              <IconButton size="small" onClick={handleQuote} title="Quote" sx={getToolbarButtonStyle()}>
                <FormatQuote fontSize="small" />
              </IconButton>

              <Divider orientation="vertical" flexItem sx={{ mx: 0.5, backgroundColor: '#d1d5db' }} />

              {/* Link */}
              <IconButton size="small" onClick={handleLink} title="Insert Link" sx={getToolbarButtonStyle()}>
                <LinkIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleUnlink} title="Remove Link" sx={getToolbarButtonStyle()}>
                <LinkOff fontSize="small" />
              </IconButton>

              <Divider orientation="vertical" flexItem sx={{ mx: 0.5, backgroundColor: '#d1d5db' }} />

              {/* Image */}
              <IconButton size="small" onClick={handleImage} title="Insert Image" sx={getToolbarButtonStyle()}>
                <ImageIcon fontSize="small" />
              </IconButton>

              <Divider orientation="vertical" flexItem sx={{ mx: 0.5, backgroundColor: '#d1d5db' }} />

              {/* Format Dropdown */}
              <Select
                value={currentFormat}
                onChange={handleFormatChange}
                size="small"
                variant="outlined"
                sx={{
                  minWidth: '120px',
                  height: '36px',
                  backgroundColor: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#d1d5db',
                  }
                }}
              >
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="Heading 1">Heading 1</MenuItem>
                <MenuItem value="Heading 2">Heading 2</MenuItem>
                <MenuItem value="Heading 3">Heading 3</MenuItem>
                <MenuItem value="Heading 4">Heading 4</MenuItem>
                <MenuItem value="Heading 5">Heading 5</MenuItem>
                <MenuItem value="Heading 6">Heading 6</MenuItem>
              </Select>

              <Divider orientation="vertical" flexItem sx={{ mx: 0.5, backgroundColor: '#d1d5db' }} />

              {/* Undo/Redo */}
              <IconButton size="small" onClick={handleUndo} title="Undo" sx={getToolbarButtonStyle()}>
                <Undo fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleRedo} title="Redo" sx={getToolbarButtonStyle()}>
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
              onFocus={() => handleInputFieldError('description', undefined)}
              style={{
                minHeight: '400px',
                padding: '15px',
                border: inputFieldError?.description ? '1px solid #D32F2F' : '1px solid #e5e7eb',
                borderTop: 'none',
                borderRadius: '0 0 4px 4px',
                backgroundColor: '#fff',
                outline: 'none',
                lineHeight: '1.6',
                fontSize: '14px',
                fontFamily: 'Arial, sans-serif',
              }}
            />
            {inputFieldError?.description && (
              <div
                style={{
                  color: '#D32F2F',
                  fontSize: '13px',
                  padding: '5px 15px 0 12px',
                  fontWeight: '400',
                }}
              >
                {inputFieldError?.description}
              </div>
            )}
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container spacing={2} sx={{ justifyContent: 'flex-end' }}>
              <Grid item>
                <button
                  onClick={onCancel}
                  style={{
                    fontWeight: '500',
                    backgroundColor: '#6b7280',
                    color: Color.white,
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '15px',
                    border: 'none',
                    minWidth: '100px',
                  }}
                >
                  Cancel
                </button>
              </Grid>
              <Grid item>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  style={{
                    fontWeight: '500',
                    backgroundColor: submitting ? '#ccc' : Color.primary,
                    color: Color.white,
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    fontSize: '15px',
                    border: 'none',
                    minWidth: '100px',
                  }}
                >
                  {submitting ? 'Saving...' : (editMode ? 'Update' : 'Create')}
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default AnnouncementPageEditor;