<template>
  <div class="hello">
    <button type="button" v-on:click="showNumberofStreamsPerGame = true; showTopGamesbyViewersCount = false; showTopStreamsbyViewersCount = false; showTopStreamsUserFollow = false; showTagsSharedBetweenUserandTopStreams = false; showStreamsByStartTime = false">Total Number of Streams For Each Game</button>
    <button type="button" v-on:click="showNumberofStreamsPerGame = false; showTopGamesbyViewersCount = true; showTopStreamsbyViewersCount = false; showTopStreamsUserFollow = false; showTagsSharedBetweenUserandTopStreams = false; showStreamsByStartTime = false">Top Games By Viewer Count</button>
    <button type="button" v-on:click="showNumberofStreamsPerGame = false; showTopGamesbyViewersCount = false; showTopStreamsbyViewersCount = true; showTopStreamsUserFollow = false; showTagsSharedBetweenUserandTopStreams = false; showStreamsByStartTime = false">Top Streams By Viewer Count</button>
    <button type="button" v-on:click="showNumberofStreamsPerGame = false; showTopGamesbyViewersCount = false; showTopStreamsbyViewersCount = false; showTopStreamsUserFollow = true; showTagsSharedBetweenUserandTopStreams = false; showStreamsByStartTime = false">Top Streams User Follow</button>
    <button type="button" v-on:click="showNumberofStreamsPerGame = false; showTopGamesbyViewersCount = false; showTopStreamsbyViewersCount = false; showTopStreamsUserFollow = false; showTagsSharedBetweenUserandTopStreams = true; showStreamsByStartTime = false">Tag Shared Between Top Streams and User Followed Streams</button>
    <button type="button" v-on:click="showNumberofStreamsPerGame = false; showTopGamesbyViewersCount = false; showTopStreamsbyViewersCount = false; showTopStreamsUserFollow = false; showTagsSharedBetweenUserandTopStreams = false; showStreamsByStartTime = true">Total Streams By Start Time</button>

    <div class="container" v-if="showNumberofStreamsPerGame">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Total Streams</th>
                    <th>Viewer Count</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="game in numberofstreamspergame.total_number_of_streams_per_game" :key="game.game_id">
                    <td>{{game.game_name}}</td>
                    <td>{{game.totalstreams}}</td>
                    <td>{{game.viewer_count}}</td>
                </tr>
            </tbody>
        </table>
                <b-pagination
      v-model="streamsPerGameIndex"
      :total-rows="numberofstreamspergame.total_count"
      :per-page="pageSize"
      aria-controls="itemList"
      align="center"
      @page-click="fetchPaginatedDataForTotalNumberofStreamsPerGame"
    ></b-pagination>
    </div>

  <div class="container" v-if="showTopGamesbyViewersCount">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Total Streams</th>
                    <th>Viewer Count</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="game in topgamesbyviewercount.top_games_by_viewer_count_for_each_game" :key="game.game_id">
                    <td>{{game.game_name}}</td>
                    <td>{{game.totalstreams}}</td>
                    <td>{{game.viewer_count}}</td>
                </tr>
            </tbody>
        </table>
        <b-pagination
      v-model="topGamesbyViewerCountIndex"
      :total-rows="topgamesbyviewercount.total_count"
      :per-page="pageSize"
      aria-controls="itemList"
      align="center"
      @page-click="fetchPaginatedDataForTopGamesByViewerCount"
    ></b-pagination>
    </div>

      <div class="container" v-if="showTopStreamsbyViewersCount">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Stream Title</th>
                    <th>Game Name</th>
                    <th>Viewer Count</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="stream in topstreamsbyviewercount.top_streams_by_viewer_count" :key="stream.stream_title">
                    <td>{{stream.stream_title}}</td>
                    <td>{{stream.game_name}}</td>
                    <td>{{stream.viewer_count}}</td>
                </tr>
            </tbody>
        </table>
                <b-pagination
      v-model="topStreamsbyViewerCountIndex"
      :total-rows="topstreamsbyviewercount.total_count"
      :per-page="pageSize"
      aria-controls="itemList"
      align="center"
      @page-click="fetchPaginatedDataForTopStreamsByViewerCount"
    ></b-pagination>
    </div>

       <div class="container" v-if="showTopStreamsUserFollow">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Stream Title</th>
                    <th>Game Name</th>
                    <th>Viewer Count</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="stream in topstreamsuserfollow.streams_user_follow_from_top_streams" :key="stream.stream_title">
                    <td>{{stream.stream_title}}</td>
                    <td>{{stream.game_name}}</td>
                    <td>{{stream.viewer_count}}</td>
                </tr>
            </tbody>
        </table>
                        <b-pagination
      v-model="topStreamsUserFollowIndex"
      :total-rows="topstreamsuserfollow.total_count"
      :per-page="pageSize"
      aria-controls="itemList"
      align="center"
      @page-click="fetchPaginatedDataForTopStreamsUserFollow"
    ></b-pagination>
    </div>

      <div class="container" v-if="showTagsSharedBetweenUserandTopStreams">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Tag Id</th>
                    <th>Tag Name</th>
                    <th>Tag Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tag in tagssharedbetweenuserandtopstreams.shared_tags_btw_user_and_top_streams" :key="tag.tag_id">
                    <td>{{tag.tag_id}}</td>
                    <td>{{game.totalstreams}}</td>
                    <td>{{game.viewer_count}}</td>
                </tr>
            </tbody>
        </table>
        <b-pagination
      v-model="tagsSharedBetweenUserandTopStreamsIndex"
      :total-rows="tagssharedbetweenuserandtopstreams.total_count"
      :per-page="pageSize"
      aria-controls="itemList"
      align="center"
      @page-click="fetchPaginatedDataForTagsSharedBetweenTopStreamsandUser"
    ></b-pagination>
    </div>

          <div class="container" v-if="showStreamsByStartTime">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Start Time</th>
                    <th>Total Streams</th>
                    <th>Viewer Count</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="stream in totalnumberofstreamsbystarttime.all_streams_by_start_time" :key="stream.starttime">
                    <td>{{stream.starttime}}</td>
                    <td>{{stream.totalstreams}}</td>
                    <td>{{stream.viewer_count}}</td>
                </tr>
            </tbody>
        </table>
        <b-pagination
      v-model="numberofStreamsbyStartTimeIndex"
      :total-rows="totalnumberofstreamsbystarttime.total_count"
      :per-page="pageSize"
      aria-controls="itemList"
      align="center"
      @page-click="fetchPaginatedDataForTotalNumberofStreamsbyStartTime"
    ></b-pagination>
        </div>
        <h3>Median Number of Streams: {{medianofstreams}}</h3>
         <h3>Number of Viewers Needed For Lowest Viewer Count Stream to Be in Top 1000 Streams{{numberforuserlowestviewtobeintopstream}}</h3>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Stream',
  data () {
    return {
      numberofstreamspergame: null,
      topgamesbyviewercount: null,
      topstreamsbyviewercount: null,
      topstreamsuserfollow: null,
      tagssharedbetweenuserandtopstreams: null,
      totalnumberofstreamsbystarttime: null,
      medianofstreams: null,
      numberforuserlowestviewtobeintopstream: null,
      access_token: null,
      pageSize: 20,
      getUserFollowedStreams: true,
      getTotalNumberofStreams: true,
      getTopGamesbyViewerCount: true,
      getTopStreamsbyViewerCount: true,
      getTotalNumberofStreamsbyStartTime: true,
      showNumberofStreamsPerGame: true,
      showTopGamesbyViewersCount: false,
      showTopStreamsbyViewersCount: false,
      showTopStreamsUserFollow: false,
      showTagsSharedBetweenUserandTopStreams: false,
      showStreamsByStartTime: false,
      streamsPerGameIndex: 1,
      topGamesbyViewerCountIndex: 1,
      topStreamsbyViewerCountIndex: 1,
      topStreamsUserFollowIndex: 1,
      tagsSharedBetweenUserandTopStreamsIndex: 1,
      numberofStreamsbyStartTimeIndex: 1
    }
  },
  async mounted () {
    try {
      const result = await this.fetchData(0)
      this.numberofstreamspergame = result.data.numberofstreamspergame
      this.topgamesbyviewercount = result.data.topgamesbyviewercount
      this.topstreamsbyviewercount = result.data.topstreamsbyviewercount
      this.topstreamsuserfollow = result.data.topstreamsuserfollow
      this.tagssharedbetweenuserandtopstreams = result.data.tagssharedbetweenuserandtopstreams
      this.totalnumberofstreamsbystarttime = result.data.totalnumberofstreamsbystarttime
      this.medianofstreams = result.data.medianofstreams.viewer_count
      this.numberforuserlowestviewtobeintopstream = result.data.numberforuserlowestviewtobeintopstream
      this.access_token = result.data.access_token
      localStorage.setItem('authtoken', this.access_token)
    } catch (error) {

    }
  },
  methods: {
    async fetchData (pageindex) {
      let result = null
      try {
        let endpoint = `http://localhost:9003/api/getStreamData?getuserfollowedstreams=${this.getUserFollowedStreams}&gettotalnumberofstreams=${this.getTotalNumberofStreams}&gettopgamesbyviewercount=${this.getTopGamesbyViewerCount}&gettopstreamsbyviewercount=${this.getTopStreamsbyViewerCount}&gettotalnumberofstreamsbystarttime=${this.getTotalNumberofStreamsbyStartTime}&pageindex=${pageindex}&pagesize=${this.pageSize}`
        if (localStorage.getItem('authtoken') !== null) {
          const config = {
            headers: {
              authToken: localStorage.getItem('authtoken')
            }
          }
          result = await axios.get(endpoint, config)
        } else if (this.$route.query.code) {
          endpoint = `http://localhost:9003/api/getStreamData?code=${this.$route.query.code}&getuserfollowedstreams=${this.getUserFollowedStreams}&gettotalnumberofstreams=${this.getTotalNumberofStreams}&gettopgamesbyviewercount=${this.getTopGamesbyViewerCount}&gettopstreamsbyviewercount=${this.getTopStreamsbyViewerCount}&gettotalnumberofstreamsbystarttime=${this.getTotalNumberofStreamsbyStartTime}&pageindex=${pageindex}&pagesize=${this.pageSize}`
          result = await axios.get(endpoint)
        }
        return result
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async fetchPaginatedDataForTotalNumberofStreamsPerGame (event, pageNumber) {
      console.log('pageNumber ' + pageNumber)
      this.getUserFollowedStreams = false
      this.getTotalNumberofStreams = true
      this.getTopGamesbyViewerCount = false
      this.getTopStreamsbyViewerCount = false
      this.getTotalNumberofStreamsbyStartTime = false
      const Index = pageNumber - 1
      const paginationIndex = Index * this.pageSize
      const result = await this.fetchData(paginationIndex)
      this.numberofstreamspergame = result.data.numberofstreamspergame
    },
    async fetchPaginatedDataForTopGamesByViewerCount (event, pageNumber) {
      this.getUserFollowedStreams = false
      this.getTotalNumberofStreams = false
      this.getTopGamesbyViewerCount = true
      this.getTopStreamsbyViewerCount = false
      this.getTotalNumberofStreamsbyStartTime = false
      const Index = pageNumber - 1
      const paginationIndex = Index * this.pageSize
      const result = await this.fetchData(paginationIndex)
      this.topgamesbyviewercount = result.data.topgamesbyviewercount
    },
    async fetchPaginatedDataForTopStreamsByViewerCount (event, pageNumber) {
      this.getUserFollowedStreams = false
      this.getTotalNumberofStreams = false
      this.getTopGamesbyViewerCount = false
      this.getTopStreamsbyViewerCount = true
      this.getTotalNumberofStreamsbyStartTime = false
      const Index = pageNumber - 1
      const paginationIndex = Index * this.pageSize
      const result = await this.fetchData(paginationIndex)
      this.topstreamsbyviewercount = result.data.topstreamsbyviewercount
    },
    async fetchPaginatedDataForTopStreamsUserFollow (event, pageNumber) {
      this.getUserFollowedStreams = true
      this.getTotalNumberofStreams = false
      this.getTopGamesbyViewerCount = false
      this.getTopStreamsbyViewerCount = false
      this.getTotalNumberofStreamsbyStartTime = false
      const Index = pageNumber - 1
      const paginationIndex = Index * this.pageSize
      const result = await this.fetchData(paginationIndex)
      this.topstreamsuserfollow = result.data.topstreamsuserfollow
    },
    async fetchPaginatedDataForTagsSharedBetweenTopStreamsandUser (event, pageNumber) {
      this.getUserFollowedStreams = true
      this.getTotalNumberofStreams = false
      this.getTopGamesbyViewerCount = false
      this.getTopStreamsbyViewerCount = false
      this.getTotalNumberofStreamsbyStartTime = false
      const Index = pageNumber - 1
      const paginationIndex = Index * this.pageSize
      const result = await this.fetchData(paginationIndex)
      this.tagssharedbetweenuserandtopstreams = result.data.tagssharedbetweenuserandtopstreams
    },
    async fetchPaginatedDataForTotalNumberofStreamsbyStartTime (event, pageNumber) {
      this.getUserFollowedStreams = false
      this.getTotalNumberofStreams = false
      this.getTopGamesbyViewerCount = false
      this.getTopStreamsbyViewerCount = false
      this.getTotalNumberofStreamsbyStartTime = true
      const Index = pageNumber - 1
      const paginationIndex = Index * this.pageSize
      const result = await this.fetchData(paginationIndex)
      this.totalnumberofstreamsbystarttime = result.data.totalnumberofstreamsbystarttime
    }
  }
}
</script>
