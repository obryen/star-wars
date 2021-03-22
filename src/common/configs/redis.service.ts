import { Injectable } from '@nestjs/common';
import * as redis from 'redis';
import * as util from 'util';
import { redisConfigs } from '../enviroment-vars';

@Injectable()
export class RedisService {
  client: redis.RedisClient;
  constructor() {
    this.initializeClient();
  }

  initializeClient(enableOffline: boolean = true) {
    this.client = redis.createClient({
      host: redisConfigs.host,
      port: redisConfigs.host,
      enable_offline_queue: true,
    });
    return this.client;
  }

  async set(key: string, value: any): Promise<any> {
    const setAsync = util.promisify(this.client.set).bind(this.client);
    return await setAsync(key, value);
  }

  async setEx(key: string, seconds: number, value: any): Promise<any> {
    const setAsync = util.promisify(this.client.setex).bind(this.client);
    return await setAsync(key, seconds, value);
  }

  async addExpiryByKey(key: string, seconds: number) {
    const setAsync = util.promisify(this.client.expire).bind(this.client);
    return await setAsync(key, seconds);
  }

  async createList(key: string, value: any[]) {
    const setArr = await this.client.rpush(key, value, (err, reply) => {
      console.log(reply);
      if (err) {
        return false;
      }
    });
    return true;
  }

  async addToExistingList(key: string, value: any): Promise<any> {
    const setAsync = util.promisify(this.client.rpush).bind(this.client);
    return await setAsync(key, value);
  }

  async createOrUpdateList(
    key: string,
    seconds: number,
    value: any,
  ): Promise<any> {
    const existingValue = await this.keyExists(key);
    let saved = false;
    if (existingValue) {
      saved = await this.addToExistingList(key, value);
    } else {
      saved = await this.createList(key, [value]);
    }
    return saved ? await this.addExpiryByKey(key, seconds) : false;
  }

  async getList(key: string): Promise<any[]> {
    const setLengthAsync = util.promisify(this.client.llen).bind(this.client);
    const length = await setLengthAsync(key);

    const setAsync = util.promisify(this.client.lrange).bind(this.client);
    const list = await setAsync(key, 0, length - 1);
    return list;
  }

  async getExistingListLegnthByKey(key: string): Promise<number> {
    const setAsync = util.promisify(this.client.llen).bind(this.client);
    return await setAsync(key);
  }

  async get(key: string) {
    const getAsync = util.promisify(this.client.get).bind(this.client);
    const results = await getAsync(key);
    return results;
  }

  async keyExists(key: string) {
    const getAsync = util.promisify(this.client.exists).bind(this.client);
    const exists = await getAsync(key);
    return exists;
  }

  async searchById(key: string) {
    const searchAsync = util.promisify(this.client.hgetall).bind(this.client);
    return await searchAsync(key);
  }
  async updateExpireTime(key: string, seconds: number) {
    const updateExpireAsync = util
      .promisify(this.client.expire)
      .bind(this.client);
    return await updateExpireAsync(key, seconds);
  }

  async updateValue(key: string, seconds: number) {
    const updateExpireAsync = util.promisify(this.client.set).bind(this.client);
    return await updateExpireAsync(key, seconds);
  }

  async deleteById(key: string): Promise<any> {
    const deleteAsync = util.promisify(this.client.del).bind(this.client);
    return await deleteAsync(key);
  }
}
