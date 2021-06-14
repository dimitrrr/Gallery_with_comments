import React from "react";
import { imageAPI } from "../../api/api";
import ImageData from "../ImageData/ImageData";
import c from "./Main.module.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      images: null,
      showModal: false,
      currentID: null
    };
  }

  handleModal(id) {
    this.setState({
      showModal: true,
      currentID: id
    })
  }

  render() {
    const { isLoading, images, showModal} = this.state;
    if (isLoading) return <div className={c.loading}>Please wait...</div>;
    if (showModal) return <ImageData id={this.state.currentID}/>;
    return (
      <main>
        <div className={c.container}>
          {images.map((el, ind) => (
            <div key={el.id}>
              <img src={el.url} alt={`number ${ind + 1}`} onClick={this.handleModal.bind(this, el.id)}/>
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
      isLoading: false,
    });
  }
}
export default Main;
