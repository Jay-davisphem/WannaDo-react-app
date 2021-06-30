function Bin(){
  function alertIt(e){
    e.preventDefault();
    alert("Do you see me‽");
  }
  return (
    <div>
      <h1>BIN2DEC</h1>
    <button onLoad={alertIt}>Click Me</button>
      <p>This app will convert Binary number to Decimal number</p>
    </div>
  );
}

export default Bin;
