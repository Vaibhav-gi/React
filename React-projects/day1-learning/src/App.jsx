import { useState, useEffect } from "react";
// import moment from "moment";

// export function DataBinding() {
//   const [departure] = useState(new Date());

//   useEffect(() => {}, []);

//   return (
//     <div className="container-fluid p-2">
//       <dl>
//         <dt>Departure</dt>
//         <dd>{moment(departure).format("dddd DD, MMMM YYYY")}</dd>
//       </dl>
//     </div>
//   );
// }

// 11/11/2025

// function App() {
//   const [mobile, setMobile] = useState("");

//   useEffect(() => {
//     setMobile(prompt("Enter mobile"));
//   }, []);

//   return (
//     <div className="container-fluid p-2" style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Mobile Validation</h2>
//       <p>
//         {mobile.match(/\+91\d{10}/) ? "Mobile Verified" : "Invalid Mobile"}
//       </p>
//     </div>
//   );
// }

// export default App;

//12/11/2025

export function DataBinding() {
  const [product, setProduct] = useState({
    title: null,
    price: 0,
    image: null,
    rating: { rate: 0, ratings: 0, reviews: 0 },
    offers: [],
  });

  function LoadProduct() {
    let http = new XMLHttpRequest();
    http.open("get", "/product.json", true);
    http.send();

    http.onreadystatechange = function () {
      if (http.readyState === 4) {
        setProduct(JSON.parse(http.responseText));
      }
    };
  }

  useEffect(() => {
    LoadProduct();
  }, []);

  return (
    <div className="container my-4">
      <div className="row align-items-start">
        <div className="col-md-3">
          <img width="100%" src={product.image} alt="product" />
        </div>
        <div className="col-md-9">
          <div className="fs-4 fw-bold">{product.title}</div>

          <div className="my-2">
            <span className="badge bg-success text-white rounded p-1">
              {product.rating.rate} <i className="bi bi-star-fill"></i>
            </span>
            <span className="fw-bold mx-2 text-secondary">
              {product.rating.ratings.toLocaleString("en-in")} ratings &{" "}
              {product.rating.reviews.toLocaleString("en-in")} reviews
            </span>
          </div>

          <div className="my-4">
            <span className="fw-bold fs-2 text-primary">
              {product.price.toLocaleString("en-in", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
              })}
            </span>
          </div>

          <div className="mt-2">
            <div className="fw-bold fs-5 my-3">Available offers</div>
            <ul className="list-unstyled">
              {product.offers.map((offer) => (
                <li className="my-2" key={offer}>
                  <i className="bi bi-tag-fill text-success"></i>
                  <span className="text-secondary ms-2">{offer}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
