import React from "react";
import { imageAPI } from "../../api/api";
import c from "./Main.module.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      images: null,
    };
  }

  render() {
    const {isLoading, images } = this.state;
    if(isLoading) return <div className={c.loading}>Please wait...</div>;
    return (
      <main>
        <div className={c.container}>
          {images.map((el) => (
            <div key={el.id}>
              <img src={el.url} alt={`number ${el.id + 1}`} />
            </div>
          ))}
        </div>
      </main>
    );
  }

  async componentDidMount() {
    let data = await imageAPI.getImages();

    this.setState({
      images: data,
      isLoading: false
    });
  }
}
export default Main;
