//helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m `;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h `;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d `;
  if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 2592000)}m `;
  return `${Math.floor(diffInSeconds / 31536000)}y `;
};

export default formatDate;
