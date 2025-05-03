// components/ValidationError.jsx
const ValidationError = ({ message }) => {
    if (!message) return null;
  
    return (
      <p style={{ color: 'red', marginTop: '0.5rem', fontSize: '0.9rem' }}>
        {message}
      </p>
    );
  };
  
  export default ValidationError;
  