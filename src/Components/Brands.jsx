import { Grid } from "@mui/material";
import BrandData from "./BrandData";

const Brands = () => {
  return (
    <Grid>
      {BrandData.map((item, i) => (
        <img
          key={i}
          src={item.src}
          alt={item.alt}
          style={{
            width: "auto",
            margin: "0 10px",
          }}
        />
      ))}
    </Grid>
  );
};

export default Brands;