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

  async addComment(event) {
    event.preventDefault();
    let name = document.querySelector("[name=name]").value;
    let text = document.querySelector("[name=comment]").value;
    if (name.trim() === "" || text.trim() === "") {
      alert("Enter your name and text of a comment!");
      return;
    }
    await imageAPI.postComment(this.props.id, { name, comment: text });
    document.querySelector("[name=name]").value = "";
    document.querySelector("[name=comment]").value = "";
    this.setState({
      comments: [
        ...this.state.comments,
        {
          id: 444,
          text,
          date: Date.now(),
        },
      ],
    });
  }

  render() {
    const { isLoading, comments, url, showModal } = this.state;
    if (isLoading) return <div className={c.loading}>Please wait...</div>;
    if (!showModal) return <Main />;
    return (
      <div className={c.modal}>
        <div className={c.image}>
          <img src={url} alt="this" />
        </div>
        <div className={c.addComment}>
          <form action="#" onSubmit={this.addComment.bind(this)}>
            <input type="text" name="name" placeholder="Your name" />
            <input type="text" name="comment" placeholder="Your comment" />
            <button>Place a comment</button>
          </form>
        </div>
        <div className={c.comments}>
          {comments.map((el) => (
            <div key={el.id} className={c.comment}>
              <div className={c.date}>{dateParser(el.date)}</div>
              <div className={c.commentText}>{el.text}</div>
            </div>
          ))}
        </div>
        <div className={c.back} onClick={this.handleModal.bind(this)}></div>
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
  }
}

export default ImageData;

function dateParser(timestamp) {
  let date = new Date(timestamp);
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let year =
    date.getFullYear() < 10 ? "0" + date.getFullYear() : date.getFullYear();
  return day + "." + month + "." + year;
}
