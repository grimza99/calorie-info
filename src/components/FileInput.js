function FileInput({ name, value, onChange }) {
  const handleChange = (e) => {
    const currentValue = e.target.files[0];
    onChange(name, currentValue);
  };

  return <input onChange={handleChange} type="file"></input>;
}

export default FileInput;
