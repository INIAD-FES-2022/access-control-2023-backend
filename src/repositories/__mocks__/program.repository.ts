import { ProgramRepository } from "repositories/program.repository";
import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { programStore } from "./mock-store";

beforeEach(() => {
  mockReset(programRepository);

  programRepository.findUnique.mockImplementation(async (id) => {
    return programStore.get(id) ?? null;
  });

  programRepository.findAll.mockImplementation(async () => {
    return [...programStore.values()];
  });
});

const programRepository = mockDeep<ProgramRepository>();
export default programRepository;
