import {Injectable} from '@nestjs/common';
import {Lead, lead_source, Prisma} from "@prisma/client";
import {IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {PrismaService} from "../../prisma.service";


export class FindAllLeadsDTO {
    @IsOptional()
    @IsNumber()
    page?: number = 1;

    @IsOptional()
    @IsNumber()
    size?: number = 10;

    @IsOptional()
    @IsString()
    sortBy?: string = 'created_at';

    @IsOptional()
    @IsString()
    sortDirection?: Prisma.SortOrder = Prisma.SortOrder.asc;
}

export class FindOneLeadDTO {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}

export class NewLeadDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    message: string;

    @IsEnum(lead_source)
    @IsNotEmpty()
    lead_source: lead_source;
}

export class UpdatedLeadDTO {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsEnum(lead_source)
    @IsNotEmpty()
    lead_source: lead_source;

}

@Injectable()
export class LeadsService {

    constructor(private readonly prisma: PrismaService) {
    }

    /**
     * Returns all leads
     * @param methodParams
     */
    async findAll(methodParams: FindAllLeadsDTO): Promise<Lead[]> {
        const page: number = methodParams.page ?? 1;
        const size: number = methodParams.size ?? 10;
        const sortBy: string = methodParams.sortBy ?? 'created_at';
        const sortDirection: string = methodParams.sortDirection ?? Prisma.SortOrder.desc

        const queryParams: any = {
            skip: (page - 1) * size,
            take: size,
            include: {
                lead_email: true,
                messages: true
            },
            orderBy: {
                [sortBy]: sortDirection
            }
        }

        return this.prisma.lead.findMany(queryParams);
    }

    /**
     * Returns one lead by id
     */
    async findOne(methodParams: FindOneLeadDTO): Promise<Lead | null> {
        return this.prisma.lead.findUnique({
            where: {
                id: methodParams.id
            },
            include: {
                lead_email: true,
                messages: true
            }
        })
    }

    /**
     * Saves a new lead
     */
    async save(methodParams: NewLeadDTO): Promise<Lead> {
        const queryParams: any = {
            data: {
                name: methodParams.name,
                lead_source: methodParams.lead_source,
                is_active: true,
                lead_email: {
                    connectOrCreate: {
                        where: {
                            email: methodParams.email
                        },
                        create: {
                            email: methodParams.email
                        }
                    }
                },
                messages: {
                    create: {
                        message: methodParams.message,
                        metadata: methodParams,
                        message_timestamp: (new Date()).getMilliseconds()
                    }
                },
            },
            include: {
                lead_email: true,
                messages: true
            }
        }

        return this.prisma.lead.create(queryParams);
    }

    /**
     * Updates one lead
     */
    async update(methodParams: UpdatedLeadDTO): Promise<Lead> {
        return this.prisma.lead.update({
            where: {
                id: methodParams.id
            },
            data: {
                name: methodParams.name,
                lead_source: methodParams.lead_source,
                lead_email: {
                    updateMany: {
                        where: {
                            lead_id: methodParams.id
                        },
                        data: {
                            email: methodParams.email
                        }
                    }
                }
            },
            include: {
                lead_email: true,
                messages: true
            }
        })
    }

    /**
     * Deletes one lead
     * @param methodParams
     */
    async delete(methodParams: FindOneLeadDTO): Promise<void> {
        await this.prisma.lead.delete({
            where: {
                id: methodParams.id
            }
        });
    }
}
