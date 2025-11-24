import axios from "axios";
import { useEffect, useRef, useState } from "react";

export function CarouselDemo() {
  const [product, setProduct] = useState({
    id: 0,
    title: null,
    price: 0,
    category: null,
    description: null,
    image: null,
    rating: { rate: 0, count: 0 },
  });

  const [status, setStatus] = useState("");
  const [currentId, setCurrentId] = useState(1); // 👈 use state for slider
  const thread = useRef(null);

  function LoadProduct(id) {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((response) => {
      setProduct(response.data);
    });
  }

  useEffect(() => {
    LoadProduct(currentId);
  }, [currentId]); // 👈 reload product when id changes

  function handleNextClick() {
    setCurrentId((prev) => (prev < 20 ? prev + 1 : prev));
  }

  function handlePreviousClick() {
    setCurrentId((prev) => (prev > 1 ? prev - 1 : prev));
  }

  function handleSeekBarChange(e) {
    setCurrentId(Number(e.target.value)); // 👈 update state directly
  }

  function handlePlayClick() {
    thread.current = setInterval(() => {
      setCurrentId((prev) => (prev < 20 ? prev + 1 : 1));
    }, 5000);
    setStatus("Slide Show - Running");
  }

  function handlePauseClick() {
    clearInterval(thread.current);
    setStatus("Slide Show - Paused");
  }

  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="card p-2 mt-4 w-50">
        <div className="card-header text-center">
          <div style={{ height: "50px", overflow: "auto" }}>{product.title}</div>
          <div className="fw-bold">{status}</div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-1 d-flex flex-column justify-content-center align-items-center">
              <button
                onClick={handlePreviousClick}
                className="btn btn-dark bi bi-chevron-left"
              ></button>
            </div>
            <div className="col-10 position-relative">
              <div className="badge position-absolute end-0 top-0 fs-5 rounded-circle bg-danger text-white p-3">
                {product.price.toLocaleString("en-us", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
              <img src={product.image} className="w-100" height={400} alt="Product" />
              <div className="mt-2">
                <input
                  type="range"
                  onChange={handleSeekBarChange}
                  value={currentId} // 👈 use state here
                  className="form-range"
                  min={1}
                  max={20}
                />
              </div>
            </div>
            <div className="col-1 d-flex flex-column justify-content-center align-items-center">
              <button
                onClick={handleNextClick}
                className="btn btn-dark bi bi-chevron-right"
              ></button>
            </div>
          </div>
        </div>
        <div className="card-footer text-center">
          <button onClick={handlePlayClick} className="btn btn-success bi bi-play"></button>
          <button onClick={handlePauseClick} className="btn btn-warning mx-2 bi bi-pause"></button>
        </div>
      </div>
    </div>
  );
}
