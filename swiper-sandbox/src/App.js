import logo from './logo.svg';
import './App.css';
import Modal from "./components/Modal";
import Item from "./components/Item";
import { useState } from "react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

function App() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  SwiperCore.use([Pagination, Autoplay])

  const handleClick = (i) => {
    setSelected(i);
    console.log('d')
    setOpen(true)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Item handleClick={handleClick} />
      {open && <Modal close={() => setOpen(false)}>
        <Swiper pagination={{ clickable: true }} initialSlide={selected}>
          <SwiperSlide>1</SwiperSlide>
          <SwiperSlide>2</SwiperSlide>
          <SwiperSlide>3</SwiperSlide>;
          <SwiperSlide>4</SwiperSlide>
        </Swiper>
      </Modal>}
    </div>
  );
}

export default App;
