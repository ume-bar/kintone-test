import {
    Sequelize,
    STRING,
    BLOB,
    FLOAT,
    UUID,
    UUIDV4,
    INTEGER,
    Model,
    ENUM,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    BOOLEAN,
} from 'sequelize'

export const sequelize = new Sequelize(
    'postgres://postgres:postgres@db/postgres',
    { define: { underscored: true } }
)

export enum LockStatusEnum {
    none = 'none',
    requestLock = 'request-lock',
    requestUnlock = 'request-unlock',
}
export enum BatteryStateEnum {
    fullBattery = 'full',
    chargingBattery = 'charging',
    dischargingBattery = 'discharging',
    unknown = 'unknown',
}
export class Building extends Model<
    InferAttributes<Building>,
    InferCreationAttributes<Building>
> {
    declare id: string
    declare name: string
    declare postCode: string
    declare address: string
    declare description: string
    declare lockStatus: LockStatusEnum
    declare mailAddresses: string[]
    declare batteryState: BatteryStateEnum
    declare batteryLevel: number
    declare createdAt: string
    declare updatedAt: string
    declare resetStatus: boolean
    declare phoneNumbers: string[]
}

Building.init(
    {
        id: {
            type: UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: STRING,
        },
        postCode: {
            type: STRING(8),
        },
        address: {
            type: STRING,
        },
        description: {
            type: STRING,
        },
        lockStatus: {
            type: ENUM,
            values: ['none', 'request-lock', 'request-unlock'],
        },
        mailAddresses: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
        },
        batteryState: {
            type: ENUM,
            values: ['full', 'charging', 'discharging', 'unknown'],
        },
        batteryLevel: {
            type: INTEGER,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        resetStatus: {
            type: BOOLEAN,
        },
        phoneNumbers: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
    },
    {
        tableName: 'buildings',
        sequelize,
    }
)

const setup = async () => {
    await sequelize.authenticate()
    await Promise.all([
        Building.sync({ alter: true }),
    ])
}

setup()