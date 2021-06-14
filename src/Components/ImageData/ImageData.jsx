import React, { Component } from "react";
import { imageAPI } from "../../api/api";
import Main from "../Main/Main";
import c from "./ImageData.module.css";

class ImageData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      comments: null,
      url: null,
      showModal: true,
    };
  }

  handleModal() {
    this.setState({
      showModal: false,
    });
  }

  render() {
    const { isLoading, comments, url, showModal } = this.state;
    if (isLoading) return <div className={c.loading}>Please wait...</div>;
    if (!showModal) return <Main/>;
    return (
      <div>
        <img src={url} alt="this" />
        <div className="comments">
          {comments.map((el) => (
            <div key={el.id}>
              {el.text} - {el.date}
            </div>
          ))}
        </div>
        <div className="back" onClick={this.handleModal.bind(this)}>Back</div>
      </div>
    );
  }

  async componentDidMount() {
    let data = await imageAPI.getImageData(this.props.id);

    this.setState({
      comments: data.data.comments,
      url: data.data.url,
      isLoading: false,
    });

    debugger;
  }
}

export default ImageData;
