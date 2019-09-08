<template>
  <div class="view-profile container">
    <div v-if="profile" class="card">
      <h2 class="deep-purple-text center">{{profile.alias}}'s Wall</h2>
      <ul class="coments collection">
        <li v-for="(comment, index) in comments" :key="index">
          <div class="nick deep-purple-text">{{ comment.from }}</div>
          <div class="message grey-text text-darken-2">{{ comment.content }}</div>
          <div class="date">{{comment.time | formatDate}}</div>
        </li>
      </ul>
      <form @submit.prevent="addComment">
        <div class="field">
          <label for="comment">Add a comment</label>
          <input type="text" id="comment" v-model="newComment" />
          <p v-if="feedback" class="red-text center">{{ feedback }}</p>
        </div>
      </form>
    </div>
    <div v-if="!profile" class="card">
      <h2 class="deep-purple-text center">User {{id}} not found</h2>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init.js";
import firebase from 'firebase/app'
import moment from 'moment'
moment.locale('pt-br') 

export default {
  name: "ViewProfile",
  props: ["id"],
  data() {
    return {
      profile: null,
      newComment: "",
      feedback: "",
      loggedUser: "",
      comments: []
    };
  },

  methods: {
    getLoggedUser() {
      db.collection("users")
        .where("user_id", "==", firebase.auth().currentUser.uid)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            this.loggedUser = doc;
          });
        })
        .catch(err => (this.feedback = err.message));
    },
    addComment() {
      if (!this.newComment) {
        this.feedback = "Comment cannot be empty";
        return;
      }
      this.feedback = "";
      db.collection("comments")
        .add({
          to: this.id,
          from: this.loggedUser.id,
          content: this.newComment,
          time: Date.now()
        })
        .then(() => {
          this.newComment = "";
        })
        .catch(err => (this.feedback = err.message));
    },
    getUsersDocById() {
      db.collection("users")
        .doc(this.id)
        .get()
        .then(user => {
          this.profile = user.data();
        });
    },
    setComment() {
      db.collection("comments")
        .where("to", "==", this.id)
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === "added") {
              this.comments.unshift({
                from: change.doc.data().from,
                content: change.doc.data().content,
                time: change.doc.data().time
              })
            }
          });
        });
    }
  },

  filters: {
    formatDate(value) {
      return moment(value).format('lll')
    }
  },

  created() {
    this.getUsersDocById();
    this.getLoggedUser();
    this.setComment();
  }
};
</script>

<style>
  .view-profile .card {
    padding: 20px;
    margin-top: 60px;
  }
  .view-profile h2 {
    font-size: 2em;
    margin-top: 0;
  }
  .view-profile li {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  .view-profile .nick {
    font-size: 1.4em;
    font-weight: 600;
  }
  .view-profile .message{
    font-size: 1.2em;
    color: rgba(0, 0, 0, 0.8)
  }
  .view-profile .date {
    font-size: 0.6em;
    color: rgba(0, 0, 0, 0.4)
  }
</style>