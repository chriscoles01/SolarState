import math
from pandas import Series


def calc_potential(tilt, solar, area):
    rad = tilt*(math.pi/180)
    scale = (1 + math.cos(rad)) / 2
    result = scale * solar * 0.75 * area  # kWh
    return result


def calc_potential_all_tilts(area_t15, area_t28, area_t41, area_t54, solar,
                             normalize=False):
    pot_15 = calc_potential(15, solar, area_t15)
    pot_28 = calc_potential(28, solar, area_t28)
    pot_41 = calc_potential(41, solar, area_t41)
    pot_54 = calc_potential(54, solar, area_t54)
    result = (pot_15 + pot_28 + pot_41 + pot_54)
    if normalize:
        try:
            result = result / (area_t15 + area_t28 + area_t41 + area_t54)
        except ZeroDivisionError:
            print("WARNING: ZeroDivisionError occurred! Setting to 0!")
            result = 0
    return result


def calc_for_solar(rooftops: Series, solar, normalize=False):
    return calc_potential_all_tilts(rooftops["t15"], rooftops["t28"],
                                    rooftops["t41"], rooftops["t54"], solar,
                                    normalize=normalize)
