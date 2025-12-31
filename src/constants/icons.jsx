/**
 * Icon Components
 * Koleksi icon SVG yang digunakan di seluruh aplikasi
 */

const Icon = ({ d, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d={d}/>
  </svg>
);

export const Icons = {
  Leaf: (props) => <Icon {...props} d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10ZM2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />,
  
  MapPin: (props) => <Icon {...props} d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />,
  
  Camera: (props) => <Icon {...props} d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
  
  Trash: (props) => <Icon {...props} d="M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6 M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />,
  
  Plus: (props) => <Icon {...props} d="M12 5v14 M5 12h14" />,
  
  List: (props) => <Icon {...props} d="M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01" />,
  
  Save: (props) => <Icon {...props} d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z M17 21v-8H7v8 M7 3v5h8" />,
  
  ChevronDown: (props) => <Icon {...props} d="m6 9 6 6 6-6" />,
  
  Image: (props) => <Icon {...props} d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z M8.5 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z M21 15l-5-5L5 21" />,
  
  Close: (props) => <Icon {...props} d="M18 6 6 18 M6 6l12 12" />,
  
  RefreshCw: (props) => <Icon {...props} d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8 M21 3v5h-5 M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16 M8 16H3v5" />,
  
  User: (props) => <Icon {...props} d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
  
  ArrowLeft: (props) => <Icon {...props} d="M19 12H5 M12 19l-7-7 7-7" />,
  
  CheckCircle: (props) => <Icon {...props} d="M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3" />,
  
  FileSpreadsheet: (props) => <Icon {...props} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2 14 8 20 8 M8 13h2 M8 17h2 M14 13h2 M14 17h2" />,
  
  FileText: (props) => <Icon {...props} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2 14 8 20 8 M16 13H8 M16 17H8 M10 9H8" />,
  
  FolderDown: (props) => <Icon {...props} d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z M12 10v6 M9 13l3 3 3-3" />,
  
  FolderUp: (props) => <Icon {...props} d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z M12 10v6 M9 13l3-3 3 3" />,
  
  Database: (props) => <Icon {...props} d="M3 5V19A9 3 0 0 0 21 19V5 M21 5A9 3 0 1 0 3 5A9 3 0 1 0 21 5Z M3 12A9 3 0 0 0 21 12" />,
  
  Files: (props) => <Icon {...props} d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z M3 6v13c0 1.1.9 2 2 2h9" />,
  
  Filter: (props) => <Icon {...props} d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
};

