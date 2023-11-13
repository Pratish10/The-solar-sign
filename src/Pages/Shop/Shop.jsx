import {
  Container,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import shopImage from "../../assets/images/shopImage.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import ShopData from "../../Data/ShopData";
import ShopPageProduct from "../../Components/ShopPageProduct";
const styles = {
  img: {
    width: "100%",
    height: "auto",
  },
  linkStyle: {
    textDecoration: "none",
    fontFamily: "inter",
    fontWeight: "500",
    fontSize: "14px",
    textAlign: "center",
  },
  selectHeading: {
    fontFamily: "inter",
    fontWeight: "600",
    fontSize: "16px",
    color: "#6C7275",
    marginBottom: ".5rem",
  },
  imageBox: {
    backgroundImage: `url('${shopImage}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  newText: {
    position: "absolute",
    top: "7%",
    left: "8%",
    backgroundColor: "white",
    fontSize: "90%",
    fontWeight: "bold",
    width: "10%",
    height: "4%",
    fontFamily: "Poppins",
    borderRadius: "2px",
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    color: "black",
  },
  discountText: {
    position: "absolute",
    top: "12%",
    left: "8%",
    backgroundColor: "green",
    color: "white",
    fontSize: "90%",
    fontWeight: "bold",
    width: "11%",
    height: "4%",
    fontFamily: "Poppins",
    borderRadius: "2px",
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
  },
};
const Shop = () => {
  const [categoryValue, setCategoryValue] = useState("All");
  const [priceValue, setPriceValue] = useState("All");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "category") {
      setCategoryValue(value);
      setSelectedCategories((prevCategories) => {
        if (prevCategories.includes(value)) {
          return prevCategories.filter((category) => category !== value);
        } else {
          return [...prevCategories, value];
        }
      });
    } else if (name === "price") {
      setPriceValue(value);
    }
  };
  let filteredItems = ShopData.filter((item) => {
    // Filter based on selected categories
    const categoryMatch =
      categoryValue === "All" || item.category === categoryValue;

    const priceMatch =
      priceValue === "All" ||
      (parseFloat(item.discountPrice) >= parseFloat(priceValue.split("-")[0]) &&
        parseFloat(item.discountPrice) <= parseFloat(priceValue.split("-")[1]));

    return categoryMatch && priceMatch;
  });
  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <Container>
      <Grid item margin={0}>
        <Grid item sx={styles.imageBox}>
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            direction="column"
          >
            <Grid item>
              <Typography variant="body2" mb={1}>
                <Link style={{ ...styles.linkStyle, color: "#605F5F" }} to="/">
                  Home
                </Link>{" "}
                &nbsp;{`>`}&nbsp;
                <Link
                  style={{ ...styles.linkStyle, color: "#121212" }}
                  to="/shop"
                >
                  Shop
                </Link>{" "}
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  fontSize: "54px",
                }}
              >
                {" "}
                Shop Page
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                sx={{
                  fontFamily: "inter",
                  fontWeight: "400",
                  fontSize: "20px",
                  color: "#121212",
                }}
              >
                {" "}
                Let’s design the place you always imagined.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: "2rem", display: "flex" }} spacing={4}>
          <Grid item sx={{ width: { xs: "100%", sm: "25%" } }}>
            <Typography sx={styles.selectHeading}>CATEGORIES</Typography>
            <FormControl sx={{ width: "100%" }}>
              <Select
                name="category"
                value={categoryValue}
                onChange={handleChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Living Room">Living Room</MenuItem>
                <MenuItem value="Bedroom">Bedroom</MenuItem>
                <MenuItem value="Bathroom">Bathroom</MenuItem>
                <MenuItem value="Dinning">Dinning</MenuItem>
                <MenuItem value="Outdoor">Outdoor</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sx={{ width: { xs: "100%", sm: "25%" } }}>
            <Typography sx={styles.selectHeading}>PRICE</Typography>

            <FormControl sx={{ width: "100%" }}>
              <Select name="price" value={priceValue} onChange={handleChange}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value={"0-100"}>0-100</MenuItem>
                <MenuItem value={"100-1000"}>100-1000</MenuItem>
                <MenuItem value={"1000-5000"}>1000-5000</MenuItem>
                <MenuItem value={"5000-10000"}>5000-10000</MenuItem>
                <MenuItem value={"10000-100000"}>10000-100000</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container sx={{ mt: "4rem" }}>
          <Grid
            item
            sx={{ width: "100%", display: "flex", flexWrap: "wrap" }}
            gap={2}
          >
            {filteredItems.slice(startIndex, endIndex).map((item, index) => (
              <Grid
                key={index}
                sx={{ width: { xs: "46%", md: "23%", sm: "30%" } }}
              >
                <ShopPageProduct
                  src={item.src}
                  alt={item.alt}
                  name={item.name}
                  discountPrice={item.discountPrice}
                  price={item.price}
                  categories={item.categories}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb={2}
        >
          <Pagination
            count={Math.ceil(ShopData.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Shop;