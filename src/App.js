import { React, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GroceryCard from "./Components/MyComponent/Grocery/GroceryCard";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Components/Home";
import ManSlider from "./Components/MyComponent/ManSlider";
import Login from "./Components/MyComponent/Login";
import Admin from "./Components/AdminUi/Admin";
import Dashboard from "./Components/AdminUi/Dashboard";
import SearchAllProducts from "./Components/MyComponent/Products/SearchAllProducts";
import Protected from "./Components/Protected";
import AdminProtected from "./Components/AdminProtected";
import Emptycart from "./Components/MyComponent/Emptycart";
import Emptyproduct from "./Components/MyComponent/Emptyproduct";
import PaymentStatic from "./Components/MyComponent/PaymentStatic";
import ShippingCart from "./Components/MyComponent/ShippingCart";
import SecurityStaticCard from "./Components/MyComponent/SecurityStaticCard";
import PrivacyStaticCard from "./Components/MyComponent/PrivacyStaticCard";
import ReturnPolicy from "./Components/MyComponent/ReturnPolicy";
import TermOfUse from "./Components/MyComponent/TermOfUse";
import EPRCompliance from "./Components/MyComponent/EPRCompliance";
import GrievanceRedressalMechanism from "./Components/MyComponent/GrievanceRedressalMechanism";
import ContactUsCard from "./Components/MyComponent/ContactUsCard";
const TrendingProduct = lazy(() =>
  import("./Components/MyComponent/Products/TrendingProduct")
);

const Category = lazy(() =>
  import("./Components/MyComponent/Category/Category")
);
const Deals = lazy(() => import("./Components/MyComponent/Products/Deals"));
const Header = lazy(() => import("./Components/MyComponent/Header/Header"));
const Footer = lazy(() => import("./Components/MyComponent/Header/Footer"));
const Address = lazy(() => import("./Components/MyComponent/Login/Address"));

const SideBar = lazy(() => import("./Components/MyComponent/SideBar/SideBar"));
const MyProfileDetails = lazy(() =>
  import("./Components/MyComponent/MyProfileDetails")
);
const Booking = lazy(() => import("./Components/MyComponent/Booking"));
const ProductByCategory = lazy(() =>
  import("./Components/MyComponent/Products/ProductByCategory")
);
const ProductDetails = lazy(() =>
  import("./Components/MyComponent/ProductDetails")
);
const ShowAllCategory = lazy(() =>
  import("./Components/MyComponent/Category/ShowAllCategory")
);
const CurrentAddress = lazy(() =>
  import("./Components/MyComponent/CurrentAddress")
);
const CurrentLogin = lazy(() =>
  import("./Components/MyComponent/CurrentLogin")
);
const OrderSummary = lazy(() =>
  import("./Components/MyComponent/OrderSummary")
);
const PaymentGateway = lazy(() =>
  import("./Components/MyComponent/PaymentGateway")
);
const MyOrder = lazy(() => import("./Components/MyComponent/MyOrder"));
const Invoice = lazy(() => import("./Components/MyComponent/Invoice"));
const DeliveryDetails = lazy(() =>
  import("./Components/MyComponent/DeliveryDetails")
);
const DeliverySecond = lazy(() =>
  import("./Components/MyComponent/DeliverySecond")
);
const InvoiceAdress = lazy(() =>
  import("./Components/MyComponent/InvoiceAdress")
);
const Leftdrawer = lazy(() => import("./Components/MyComponent/LeftDrawer"));

const CouponComponent = lazy(() =>
  import("./Components/MyComponent/CouponComponent")
);
const Order = lazy(() => import("./Components/MyComponent/Order/Order"));

function App() {
  return (
    <div>
      <Router>
        <Suspense>
          <Routes>
            <Route element={<Protected Component={Login} />} path="/login" />
            <Route element={<Emptycart />} path={"/emptycart"} />
            <Route element={<PaymentStatic />} path={"/paymentstatic"} />
            <Route
              element={<SecurityStaticCard />}
              path={"/securitystaticcard"}
            />
            <Route
              element={<PrivacyStaticCard />}
              path={"/privacystaticcard"}
            />
            <Route element={<Emptyproduct />} path={"/emptyproduct"} />
            <Route element={<ShippingCart />} path={"/shippingCart"} />
            <Route element={<ReturnPolicy />} path={"/returnpolicy"} />
            <Route element={<TermOfUse />} path={"/termofuse"} />
            <Route element={<ContactUsCard />} path={"/contactUscard"} />

            <Route element={<EPRCompliance />} path={"/erpcompliance"} />
            <Route element={<GrievanceRedressalMechanism />} path={"/grm"} />

            <Route element={<Admin />} path={"/admin"} />
            <Route element={<Dashboard />} path={"/dashboard/*"} />
            <Route
              element={<ShowAllCategory/>}
              path="/showallcategory"
            />
            <Route element={<Protected Component={Header} />} path="/header" />
            <Route
              element={<Protected Component={GroceryCard} />}
              path="/Grocerycard"
            />
            <Route element={<Order />} path="/order" />
            <Route
              element={<Protected Component={MyOrder} />}
              path="/myorder"
            />
            <Route element={<Protected Component={Footer} />} path="/footer" />
            <Route element={<Home />} path="/" />
            <Route
              element={<Protected Component={ManSlider} />}
              path="/manslider"
            />
            <Route
              element={<Protected Component={Category} />}
              path="/category"
            />
            
            <Route
              element={<ProductByCategory />}
              path="/productbycategory/:categoryid"
            />
            <Route
              element={<Protected Component={Address} />}
              path="/address"
            />
            <Route element={<SideBar />} path="/sidebar" />
            <Route
              element={<Protected Component={MyProfileDetails} />}
              path="/myprofiledetails"
            />
            <Route
              element={<Protected Component={Booking} />}
              path="/booking"
            />
            <Route
              element={<ProductDetails />}
              path="/productdetails/:productid"
            />
            <Route
              element={<Protected Component={TrendingProduct} />}
              path="/trending"
            />
            <Route element={<Protected Component={Deals} />} path="/deal" />
            <Route
              element={<Protected Component={CurrentAddress} />}
              path="/currentaddress"
            />
            <Route
              element={<Protected Component={CurrentLogin} />}
              path="/currentlogin"
            />
            <Route
              element={<Protected Component={OrderSummary} />}
              path="/ordersummery"
            />
            <Route
              element={<Protected Component={PaymentGateway} />}
              path="/paymentgateway"
            />
            <Route element={<InvoiceAdress />} path="/invoiceadress/:billid" />
            <Route element={<DeliveryDetails />} path="/delivery/:billid" />
            <Route
              element={<Protected Component={DeliverySecond} />}
              path="/deliverysecond"
            />
            <Route element={<Invoice />} path="/invoice/:billid" />
            <Route
              element={<SearchAllProducts />}
              path="/searchallproducts/:searching"
            />

            <Route
              element={<Protected Component={Leftdrawer} />}
              path="/leftdrawer"
            />
            <Route
              element={<Protected Component={CouponComponent} />}
              path="/couponcomponent"
            />
          </Routes>
        </Suspense>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        transition={Slide}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
