<template>
  <div id="template">
    <el-input
      class="edit title"
      v-show="edit"
      :spellcheck="true"
      id="title-edit"
      type="text"
      v-model="notificationTitle"
      :rows="1"
      :cols="10"
    >
    </el-input>
    <div @click="copyTitle">
      <el-input
        class="display title"
        v-show="!edit"
        :spellcheck="true"
        id="title-display"
        type="text"
        v-model="notificationTitle"
        :rows="1"
        :cols="10"
        :readonly="true"
      >
      </el-input>
    </div>

    <el-tooltip
      v-show="edit"
      effect="light"
      content="Do not modify Start/End time manually!"
      placement="left"
      size="large"
    >
      <el-input
        class="edit body"
        :spellcheck="true"
        resize="none"
        type="textarea"
        v-model="notificationText"
        :rows="23"
        :cols="50"
      >
      </el-input>
    </el-tooltip>
    <!-- <VueShowdown id="body-display" class="display body" v-show="!edit" style="text-align:left" :markdown="notificationText"/> -->
    <!-- <div @click="copyBody"> -->
    <div @click="copyBody">
      <VueShowdown
        id="body-display"
        class="display body"
        v-show="!edit"
        style="text-align:left"
        :markdown="timeUpdatedNotificationtext"
      />
    </div>

    <el-button
      icon="el-icon-edit"
      class="edit-save-btns"
      id="edit-btn"
      v-if="!edit"
      @click="edit = !edit"
      size="mini"
    >
      EDIT
    </el-button>
    <el-tooltip
      v-if="edit"
      effect="light"
      content="Load original notification and discard all changes"
      placement="top"
      size="small"
    >
      <el-button
        icon="el-icon-close"
        class="edit-save-btns"
        id="discard-changes-btn"
        @click="resetNotificationText"
        size="mini"
      >
        RESET
      </el-button>
    </el-tooltip>
    <el-button
      icon="el-icon-check"
      class="edit-save-btns"
      id="save-btn"
      v-if="edit"
      @click="edit = !edit"
      size="mini"
    >
      SAVE
    </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notif: ""
    };
  },
  computed: {
    notificationText: {
      get() {
        return this.$store.getters.notificationText;
      },
      set(modification) {
        this.$store.commit("setNotificationText", modification);
      }
    },
    edit: {
      get() {
        return this.$store.state.editing;
      },
      set(val) {
        this.$store.commit("setEditing", val);
      }
    },
    notificationTitle: {
      get() {
        return this.$store.getters.notificationTitle;
      },
      set(modification) {
        this.$store.commit("setNotificationTitle", modification);
      }
    },
    // title(){
    //     return this.$store.state.activeTicket?this.$store.state.activeTicket.email_subject:''
    // },
    timeUpdatedNotificationtext() {
      return this.$store.getters.timeUpdatedNotificationText;
    },
    ticketNumber() {
      return this.$store.state.ticketNumber;
    }
  },
  methods: {
    resetNotificationText() {
      this.$store.commit("resetNotificationText", "");
    },
    copyTitle() {
      this.$clipboard(`${this.ticketNumber} ${this.notificationTitle}`);
      this.$message({
        duration: 2000,
        offset: 180,
        message: "Title copied!",
        type: "info"
      });
    },
    copyBody() {
      this.$clipboard(
        `${this.timeUpdatedNotificationtext.replace(/\n{3,}/, "\n\n")}`
      );
      this.$message({
        duration: 2000,
        offset: 180,
        message: "Notification copied!",
        type: "info"
      });
    }
  }
};
</script>

<style scoped>
#template {
  border: 1px solid green;
  width: 450px;
}

#body-display {
  padding: 4px 10px;
}

.body {
  height: 500px;
  font-size: 14px;
}

.title {
  font-size: 13px;
  font-weight: 800;
  border-bottom: 1px solid lightgray;
}

#title-display,
#title-edit,
.title {
  height: 55px !important;
  line-height: 55px;
  margin: 0;
}

.edit-save-btns,
.edit-save-btns:focus {
  color: lightblue;
  background-color: white;
  border: 1px solid lightblue;
}

#edit-btn:hover {
  border: 1px solid orange;
  color: orange;
  background-color: white;
}

#save-btn {
  border: 1px solid green;
  color: green;
  background-color: white;
}

#discard-changes-btn {
  border: 1px solid red;
  color: red;
  background-color: white;
}
</style>
