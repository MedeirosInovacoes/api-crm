import { PIPELINES_STAGES } from '@/@core/@shared/infra/contants/pipeline-stages'

export class ReturnPipelineStageByIdHelper {
  static execute = (stageId: string): string => {
    const stages = Object.values(PIPELINES_STAGES).flatMap((pipelineStages) =>
      Object.entries(pipelineStages).map(([key, value]) => ({ key, value })),
    )

    const stage = stages.find((stage) => stage.key === stageId)

    return stage?.value || 'Inválido'
  }
}
