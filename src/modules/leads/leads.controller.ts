import {Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, Query} from "@nestjs/common";
import {FindAllLeadsDTO, FindOneLeadDTO, LeadsService, NewLeadDTO, UpdatedLeadDTO} from "./leads.service";
import {Lead, lead_source} from "@prisma/client";
import {ApiTags} from "@nestjs/swagger";
import {NewLeadMessageRequestDTO, UpdateLeadRequestDTO} from "./leads.dto";

@Controller('/leads')
export class LeadsController {


    constructor(private readonly leadsService: LeadsService) {
    }

    async getHello() {
        return 'Hello World!';
    }

    /**
     * Find all leads
     */
    @Get('/')
    @ApiTags('Leads')
    @HttpCode(200)
    async findAll(
        @Query() query: FindAllLeadsDTO
    ): Promise<Lead[]> {
        return await this.leadsService.findAll(query);
    }

    @Get('/:id')
    @ApiTags('Leads')
    @HttpCode(200)
    async findOne(
        @Param('id') id: number
    ): Promise<Lead> {
        const findOneLeadDTO: FindOneLeadDTO = {
            id: +id
        };

        const lead = await this.leadsService.findOne(findOneLeadDTO);

        if (!lead) {
            throw new NotFoundException({
                errors: [
                    {
                        "status": "404",
                        "title": "Lead Not Found",
                        "detail": "Lead not found."
                    }
                ]
            })
        }

        return lead;
    }

    @Post('/')
    @ApiTags('Leads')
    @HttpCode(201)
    async create(
        @Body() input: NewLeadMessageRequestDTO
    ): Promise<Lead> {
        const createNewLeadDTO: NewLeadDTO = {
            name: input.name,
            email: input.email,
            message: input.message,
            lead_source: lead_source.api
        }

        return await this.leadsService.save(createNewLeadDTO);
    }

    @Patch('/:id')
    @ApiTags('Leads')
    @HttpCode(200)
    async update(
        @Param('id') id: number,
        @Body() input: UpdateLeadRequestDTO
    ): Promise<Lead> {
        const updateLeadDTO: UpdatedLeadDTO = {
            id: +id,
            name: input.name,
            email: input.email,
            lead_source: lead_source.api
        }
        return await this.leadsService.update(updateLeadDTO);
    }

    @Delete('/:id')
    @ApiTags('Leads')
    @HttpCode(204)
    async delete(
        @Param('id') id: number,
    ): Promise<void> {
        const findOneLeadDTO: FindOneLeadDTO = {
            id: +id
        };

        const lead = await this.leadsService.findOne(findOneLeadDTO);

        if (!lead) {
            throw new NotFoundException({
                errors: [
                    {
                        "status": "404",
                        "title": "Lead Not Found",
                        "detail": "Lead not found."
                    }
                ]
            })
        }

        await this.leadsService.delete(findOneLeadDTO);
    }
}