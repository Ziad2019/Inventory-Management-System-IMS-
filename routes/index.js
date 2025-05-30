

// routing
import categoryRoute from "./categoryRoute.js";
import supplierRoute from "./supplierRoute.js";
import productRoute from "./productRoute.js";
import userRoute from "./userRoute.js";
import authRoute from "./authRoute.js";
import transactionsRoute from "./transactionsRoute.js";

export const mountRouting=(app)=>{
// routing
app.use("/api", categoryRoute);
app.use("/api", supplierRoute);
app.use("/api", productRoute);
app.use("/api", userRoute);
app.use("/api", authRoute);
app.use("/api", transactionsRoute);
}