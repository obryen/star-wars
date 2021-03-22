import { HttpModule, HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from '../../src/common/configs/redis.service';
import { HomeWorldModel } from '../../src/star-wars/models/homeworld';
import { PeopleModel } from '../../src/star-wars/models/people';
import { StarWarsService } from '../../src/star-wars/services/star-wars.service';

describe('StarWarsService', () => {
  let service: StarWarsService;

  const findOneMock = jest.fn((dto: any) => {
    return dto;
  });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ],
      providers: [
        StarWarsService,
        {
          provide: RedisService,
          useValue: {},
        },
        {
          provide: HttpService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<StarWarsService>(StarWarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a single person', async () => {
    const name = 'Anakin Skywalker';

    const result = new PeopleModel({
      name: `Anakin Skywalker`,
      homeworld: new HomeWorldModel(),
    });

    jest.spyOn(service, 'fetchOnePerson').mockResolvedValueOnce([result]);

    expect(await service.fetchOnePerson(name)).toEqual([result]);
  });

  it('should return a list of people', async () => {
    const pageNum = 3;

    const result = [new PeopleModel()];

    jest
      .spyOn(service, 'fetchAllPeople')
      .mockImplementation(() => Promise.resolve(result));

    expect(await service.fetchAllPeople(pageNum)).toEqual(result);
  });

  afterAll(async (done) => {
    done();
  });
});
