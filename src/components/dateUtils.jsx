// dateUtils.js
export const formatDateTime = (isoString) => {
    if (!isoString) return 'N/A';
    
    try {
      const date = new Date(isoString);
      
      // Handle invalid dates
      if (isNaN(date.getTime())) return 'Invalid date';
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
  
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Format error';
    }
  };
  
  // Optional: For UTC formatting
  export const formatUTCDateTime = (isoString) => {
    if (!isoString) return 'N/A';
    
    try {
      const date = new Date(isoString);
      
      if (isNaN(date.getTime())) return 'Invalid date';
      
      return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')} ${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}`;
    } catch (error) {
      console.error('Error formatting UTC date:', error);
      return 'Format error';
    }
  };