const CustomToolbar = () => {
  return (
    <div id="quill-toolbar">
      <select className="ql-size">
        <option value="small">Small</option>
        <option value="large">Medium</option>
        <option value="huge">Large</option>
      </select>
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-underline"></button>
      <button className="ql-header" value="1"></button>
      <button className="ql-header" value="2"></button>
      <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
      <button className="ql-script" value="sub"></button>
      <button className="ql-script" value="super"></button>
      <button className="ql-indent" value="-1"></button>
      <button className="ql-indent" value="+1"></button>
      <button className="ql-blockquote"></button>
      <button className="ql-code-block"></button>
      <button className="ql-clean"></button>
    </div>
  );
};

export default CustomToolbar;
