import { Test, TestingModule } from '@nestjs/testing';
import { BenefitTypeController } from './benefit-type.controller';
import { BenefitTypeService } from './benefit-type.service';

describe('BenefitTypeController', () => {
  let controller: BenefitTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BenefitTypeController],
      providers: [BenefitTypeService],
    }).compile();

    controller = module.get<BenefitTypeController>(BenefitTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
