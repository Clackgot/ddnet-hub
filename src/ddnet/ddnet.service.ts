import { Injectable } from '@nestjs/common';
import { Client } from 'teeworlds';

@Injectable()
export class DdnetService {
  private client;
  async onModuleInit() {
    this.client = new Client("37.230.162.50", 8335, "rock");
    this.client.connect();

    this.client.on("connected", () => {
      console.log("Connected!");
    })

    this.client.on("disconnect", reason => {
      // you got kicked from the server
      console.log("Disconnected: " + reason);
    })

    this.client.on("message", payload => {
      const message = payload?.['message'];
      const author = payload?.['author']?.['ClientInfo']?.['name'];

      // const { ClientInfo } = author;
      // const { name } = ClientInfo;
      // console.log(payload);
      if (author && message) console.log(`[${author}]: ${message}`);
      if (author && message) console.log(payload);
      // if (author && message) console.log(payload);
      // if (author && message) console.log();
      /* {
        team: 0,
        client_id: 14,
        message: 'a',
        author: {
          ClientInfo: {
            name: 'Nudelsaft c:',
            clan: '',
            country: 276,
            skin: 'coala_toptri',
            use_custom_color: 0,
            color_body: 4718592,
            color_feet: 5046016
          },
          PlayerInfo: { local: 0, client_id: 4, team: 0, score: 36, latency: 0 }
        }
        }
       */
    })

    // this.client.on("kill", info => {
    //   console.log(info)
    // })
    //
    process.on("SIGINT", () => {
      this.client.Disconnect().then(() => process.exit(0)); // disconnect on ctrl + c
      // process.exit()
    })
    // process.stdin.on("data", data => {
    //   this.client.game.Say(data.toString()); // write input in chat
    // })

  }
  async onApplicationShutdown() {
    await this.client.Disconnect();
  }
  async onModuleDestroy() {
    await this.client.Disconnect();
  }
}

